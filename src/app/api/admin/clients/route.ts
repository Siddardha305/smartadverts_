import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import clientPromise from '@/lib/mongodb';

const getLocalFilePath = () => path.join(process.cwd(), 'src/data/clients.json');
const getDbAndCollection = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'smartadverts');
  const collection = db.collection('clients');
  return collection;
};

function isAuthorized(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  const correctPassword = process.env.ADMIN_PASSWORD || 'smartadverts123';
  return token === correctPassword;
}

interface ClientChannelWithId {
  id: number;
  name: string;
  image: string;
  subscribers?: string;
  highlightSide?: 'left' | 'right';
}

export async function GET() {
  try {
    const collection = await getDbAndCollection();
    
    // Check if the collection has any documents
    let count = await collection.countDocuments();
    if (count === 0) {
      // Automatic Seeding from local static JSON
      try {
        const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
        const clients = JSON.parse(fileData) as ClientChannelWithId[];
        if (clients.length > 0) {
          // Normalize list to ensure IDs exist
          const clientsWithId = clients.map((c: ClientChannelWithId, index: number) => ({
            ...c,
            id: c.id || index + 1
          }));
          await collection.insertMany(clientsWithId);
          console.log(`Successfully seeded ${clientsWithId.length} clients from JSON to MongoDB.`);
        }
      } catch (err) {
        console.warn('Failed to seed clients from local file (file might not exist or empty):', err);
      }
    }

    const clients = await collection.find({}).sort({ id: 1 }).toArray();
    // Map to remove MongoDB internal _id object
    const mappedClients = clients.map(({ _id, ...rest }) => rest);
    
    return NextResponse.json(mappedClients);
  } catch (error) {
    console.error('Failed to get clients from MongoDB, falling back to local JSON:', error);
    try {
      const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
      const clients = JSON.parse(fileData) as ClientChannelWithId[];
      const clientsWithId = clients.map((c: ClientChannelWithId, index: number) => ({
        ...c,
        id: c.id || index + 1
      }));
      return NextResponse.json(clientsWithId);
    } catch (fallbackError) {
      console.error('Failed to read local fallback clients.json:', fallbackError);
      return NextResponse.json([], { status: 200 });
    }
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let data;
  try {
    data = await request.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
  }

  try {
    const collection = await getDbAndCollection();

    if (data.id) {
      // Edit mode
      await collection.updateOne(
        { id: Number(data.id) },
        {
          $set: {
            name: data.name,
            image: data.image,
            subscribers: data.subscribers || undefined,
            highlightSide: data.highlightSide || undefined
          }
        }
      );
    } else {
      // Add mode - find next incremental ID
      const lastClient = await collection.findOne({}, { sort: { id: -1 } });
      const nextId = lastClient ? lastClient.id + 1 : 1;
      const newClient: ClientChannelWithId = {
        id: nextId,
        name: data.name,
        image: data.image,
        subscribers: data.subscribers || undefined,
        highlightSide: data.highlightSide || undefined
      };
      await collection.insertOne(newClient);
    }

    // Return the updated list of clients
    const allClients = await collection.find({}).sort({ id: 1 }).toArray();
    const mappedClients = allClients.map(({ _id, ...rest }) => rest);

    return NextResponse.json({ success: true, clients: mappedClients });
  } catch (error) {
    const err = error as Error;
    console.error('POST clients error, falling back to local JSON:', err);
    try {
      const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
      const clients = JSON.parse(fileData) as ClientChannelWithId[];
      
      let updatedClients: ClientChannelWithId[] = [];
      const normalizedClients = clients.map((c: ClientChannelWithId, idx: number) => ({
        ...c,
        id: c.id || idx + 1
      }));

      if (data.id) {
        updatedClients = normalizedClients.map(c => c.id === Number(data.id) ? {
          ...c,
          name: data.name,
          image: data.image,
          subscribers: data.subscribers || undefined,
          highlightSide: data.highlightSide || undefined
        } : c);
      } else {
        const lastClient = normalizedClients[normalizedClients.length - 1];
        const nextId = lastClient ? lastClient.id + 1 : 1;
        const newClient: ClientChannelWithId = {
          id: nextId,
          name: data.name,
          image: data.image,
          subscribers: data.subscribers || undefined,
          highlightSide: data.highlightSide || undefined
        };
        updatedClients = [...normalizedClients, newClient];
      }
      
      await fs.writeFile(getLocalFilePath(), JSON.stringify(updatedClients, null, 2), 'utf-8');
      return NextResponse.json({ success: true, clients: updatedClients });
    } catch (fallbackError) {
      console.error('Failed to write to local clients.json:', fallbackError);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const collection = await getDbAndCollection();
    await collection.deleteOne({ id: Number(id) });

    // Return the remaining list of clients
    const allClients = await collection.find({}).sort({ id: 1 }).toArray();
    const mappedClients = allClients.map(({ _id, ...rest }) => rest);

    return NextResponse.json({ success: true, clients: mappedClients });
  } catch (error) {
    const err = error as Error;
    console.error('DELETE clients error, falling back to local JSON:', err);
    try {
      const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
      const clients = JSON.parse(fileData) as ClientChannelWithId[];
      const normalizedClients = clients.map((c: ClientChannelWithId, idx: number) => ({
        ...c,
        id: c.id || idx + 1
      }));
      const updatedClients = normalizedClients.filter(c => c.id !== Number(id));
      
      await fs.writeFile(getLocalFilePath(), JSON.stringify(updatedClients, null, 2), 'utf-8');
      return NextResponse.json({ success: true, clients: updatedClients });
    } catch (fallbackError) {
      console.error('Failed to write to local clients.json after delete:', fallbackError);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
