import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import clientPromise from '@/lib/mongodb';

const getLocalFilePath = () => path.join(process.cwd(), 'src/data/instagram.json');
const getDbAndCollection = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'smartadverts');
  const collection = db.collection('instagram');
  return collection;
};

function isAuthorized(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  const correctPassword = process.env.ADMIN_PASSWORD || 'smartadverts123';
  return token === correctPassword;
}

interface InstagramConfig {
  username: string;
  profileImage: string;
  posts: string;
  followers: string;
  following: string;
  fullName: string;
  category: string;
  adminText: string;
  adminLink: string;
  bioLine1: string;
  bioLine2: string;
  bioLine3: string;
  websiteLabel: string;
  websiteUrl: string;
}

export async function GET() {
  try {
    const collection = await getDbAndCollection();
    
    // Check if the collection has any documents
    let config = await collection.findOne({});
    if (!config) {
      // Seeding from local static JSON
      try {
        const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
        const defaultData = JSON.parse(fileData) as InstagramConfig;
        await collection.insertOne({ ...defaultData, id: 'profile' });
        config = await collection.findOne({});
        console.log("Successfully seeded default Instagram configuration to MongoDB.");
      } catch (err) {
        console.warn('Failed to seed Instagram config from local file:', err);
      }
    }

    if (config) {
      const { _id, id, ...rest } = config;
      return NextResponse.json(rest);
    }
    
    // If not found in database and seeding failed, load from local file
    const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
    return NextResponse.json(JSON.parse(fileData));
    
  } catch (error) {
    console.error('Failed to get Instagram config from MongoDB, falling back to local JSON:', error);
    try {
      const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
      return NextResponse.json(JSON.parse(fileData));
    } catch (fallbackError) {
      console.error('Failed to read local fallback instagram.json:', fallbackError);
      return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    }
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let data: Partial<InstagramConfig>;
  try {
    data = await request.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
  }

  try {
    const collection = await getDbAndCollection();
    
    // Update MongoDB
    await collection.updateOne(
      { id: 'profile' },
      { $set: data },
      { upsert: true }
    );

    const updatedConfig = await collection.findOne({ id: 'profile' });
    const { _id, id, ...rest } = updatedConfig!;

    // Keep the local JSON in sync when writing (or on fallback)
    try {
      await fs.writeFile(getLocalFilePath(), JSON.stringify(rest, null, 2), 'utf-8');
    } catch (err) {
      console.warn("Failed to update local JSON file during DB write:", err);
    }

    return NextResponse.json({ success: true, config: rest });
  } catch (error) {
    const err = error as Error;
    console.error('POST instagram error, falling back to local JSON file update:', err);
    
    try {
      const fileData = await fs.readFile(getLocalFilePath(), 'utf-8');
      const currentConfig = JSON.parse(fileData) as InstagramConfig;
      
      const newConfig = {
        ...currentConfig,
        ...data
      };
      
      await fs.writeFile(getLocalFilePath(), JSON.stringify(newConfig, null, 2), 'utf-8');
      return NextResponse.json({ success: true, config: newConfig });
    } catch (fallbackError) {
      console.error('Failed to write to local instagram.json:', fallbackError);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
