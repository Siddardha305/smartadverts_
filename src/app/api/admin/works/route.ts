import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import clientPromise from '@/lib/mongodb';

const getLocalFilePath = () => path.join(process.cwd(), 'src/data/works.json');
const getDbAndCollection = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'smartadverts');
  const collection = db.collection('works');
  return collection;
};

function isAuthorized(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  const correctPassword = process.env.ADMIN_PASSWORD || 'smartadverts123';
  return token === correctPassword;
}

interface Work {
  id: number;
  beforeImage: string;
  afterImage: string;
  thumbnail: string;
  label: string;
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
        const works = JSON.parse(fileData) as Work[];
        if (works.length > 0) {
          await collection.insertMany(works);
          console.log(`Successfully seeded ${works.length} works from JSON to MongoDB.`);
        }
      } catch (err) {
        console.warn('Failed to seed works from local file (file might not exist or empty):', err);
      }
    }

    const works = await collection.find({}).sort({ id: 1 }).toArray();
    // Map to remove MongoDB internal _id object
    const mappedWorks = works.map(({ _id, ...rest }) => rest);
    
    return NextResponse.json(mappedWorks);
  } catch (error) {
    console.error('Failed to get works from MongoDB, falling back to local JSON:', error);
    try {
      const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
      const works = JSON.parse(fileData) as Work[];
      return NextResponse.json(works);
    } catch (fallbackError) {
      console.error('Failed to read local fallback works.json:', fallbackError);
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
            label: data.label,
            beforeImage: data.beforeImage,
            afterImage: data.afterImage,
            thumbnail: data.thumbnail || data.afterImage
          }
        }
      );
    } else {
      // Add mode - find next incremental ID
      const lastWork = await collection.findOne({}, { sort: { id: -1 } });
      const nextId = lastWork ? lastWork.id + 1 : 1;
      const newWork: Work = {
        id: nextId,
        label: data.label,
        beforeImage: data.beforeImage,
        afterImage: data.afterImage,
        thumbnail: data.thumbnail || data.afterImage
      };
      await collection.insertOne(newWork);
    }

    // Return the updated list of works
    const allWorks = await collection.find({}).sort({ id: 1 }).toArray();
    const mappedWorks = allWorks.map(({ _id, ...rest }) => rest);

    return NextResponse.json({ success: true, works: mappedWorks });
  } catch (error) {
    const err = error as Error;
    console.error('POST works error, falling back to local JSON:', err);
    try {
      const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
      const works = JSON.parse(fileData) as Work[];
      
      let updatedWorks: Work[] = [];
      if (data.id) {
        updatedWorks = works.map(w => w.id === Number(data.id) ? {
          ...w,
          label: data.label,
          beforeImage: data.beforeImage,
          afterImage: data.afterImage,
          thumbnail: data.thumbnail || data.afterImage
        } : w);
      } else {
        const lastWork = works[works.length - 1];
        const nextId = lastWork ? lastWork.id + 1 : 1;
        const newWork: Work = {
          id: nextId,
          label: data.label,
          beforeImage: data.beforeImage,
          afterImage: data.afterImage,
          thumbnail: data.thumbnail || data.afterImage
        };
        updatedWorks = [...works, newWork];
      }
      
      await fs.writeFile(getLocalFilePath(), JSON.stringify(updatedWorks, null, 2), 'utf-8');
      return NextResponse.json({ success: true, works: updatedWorks });
    } catch (fallbackError) {
      console.error('Failed to write to local works.json:', fallbackError);
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

    // Return the remaining list of works
    const allWorks = await collection.find({}).sort({ id: 1 }).toArray();
    const mappedWorks = allWorks.map(({ _id, ...rest }) => rest);

    return NextResponse.json({ success: true, works: mappedWorks });
  } catch (error) {
    const err = error as Error;
    console.error('DELETE works error, falling back to local JSON:', err);
    try {
      const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
      const works = JSON.parse(fileData) as Work[];
      const updatedWorks = works.filter(w => w.id !== Number(id));
      
      await fs.writeFile(getLocalFilePath(), JSON.stringify(updatedWorks, null, 2), 'utf-8');
      return NextResponse.json({ success: true, works: updatedWorks });
    } catch (fallbackError) {
      console.error('Failed to write to local works.json after delete:', fallbackError);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
