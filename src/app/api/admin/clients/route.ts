import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const getFilePath = () => path.join(process.cwd(), 'src/data/clients.json');

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
    const fileData = await fs.readFile(getFilePath(), 'utf-8');
    const clients = JSON.parse(fileData) as ClientChannelWithId[];
    // Ensure every client has an ID for administrative editing
    const clientsWithId = clients.map((c: ClientChannelWithId, index: number) => ({
      ...c,
      id: c.id || index + 1
    }));
    return NextResponse.json(clientsWithId);
  } catch (error) {
    console.error('Failed to get clients:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const fileData = await fs.readFile(getFilePath(), 'utf-8');
    let clients = JSON.parse(fileData) as ClientChannelWithId[];

    // Normalize list to ensure IDs exist
    clients = clients.map((c: ClientChannelWithId, index: number) => ({
      ...c,
      id: c.id || index + 1
    }));

    if (data.id) {
      // Edit mode
      clients = clients.map((c: ClientChannelWithId) => (c.id === Number(data.id) ? { ...c, ...data, id: Number(data.id) } : c));
    } else {
      // Add mode
      const nextId = clients.reduce((max: number, c: ClientChannelWithId) => Math.max(max, c.id), 0) + 1;
      const newClient: ClientChannelWithId = {
        id: nextId,
        name: data.name,
        image: data.image,
        subscribers: data.subscribers || undefined,
        highlightSide: data.highlightSide || undefined
      };
      clients.push(newClient);
    }

    await fs.writeFile(getFilePath(), JSON.stringify(clients, null, 2), 'utf-8');
    return NextResponse.json({ success: true, clients });
  } catch (error) {
    const err = error as Error;
    console.error('POST clients error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const fileData = await fs.readFile(getFilePath(), 'utf-8');
    let clients = JSON.parse(fileData) as ClientChannelWithId[];

    // Normalize list to ensure IDs exist for filtering
    clients = clients.map((c: ClientChannelWithId, index: number) => ({
      ...c,
      id: c.id || index + 1
    }));

    clients = clients.filter((c: ClientChannelWithId) => c.id !== Number(id));

    await fs.writeFile(getFilePath(), JSON.stringify(clients, null, 2), 'utf-8');
    return NextResponse.json({ success: true, clients });
  } catch (error) {
    const err = error as Error;
    console.error('DELETE clients error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
