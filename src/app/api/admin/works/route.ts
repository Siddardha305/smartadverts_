import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const getFilePath = () => path.join(process.cwd(), 'src/data/works.json');

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
    const fileData = await fs.readFile(getFilePath(), 'utf-8');
    return NextResponse.json(JSON.parse(fileData));
  } catch (error) {
    console.error('Failed to get works:', error);
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
    let works = JSON.parse(fileData) as Work[];

    if (data.id) {
      // Edit mode
      works = works.map((w: Work) => (w.id === Number(data.id) ? { ...w, ...data, id: Number(data.id) } : w));
    } else {
      // Add mode
      const nextId = works.reduce((max: number, w: Work) => Math.max(max, w.id), 0) + 1;
      const newWork: Work = {
        id: nextId,
        label: data.label,
        beforeImage: data.beforeImage,
        afterImage: data.afterImage,
        thumbnail: data.thumbnail || data.afterImage
      };
      works.push(newWork);
    }

    await fs.writeFile(getFilePath(), JSON.stringify(works, null, 2), 'utf-8');
    return NextResponse.json({ success: true, works });
  } catch (error) {
    const err = error as Error;
    console.error('POST works error:', err);
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
    let works = JSON.parse(fileData) as Work[];
    works = works.filter((w: Work) => w.id !== Number(id));

    await fs.writeFile(getFilePath(), JSON.stringify(works, null, 2), 'utf-8');
    return NextResponse.json({ success: true, works });
  } catch (error) {
    const err = error as Error;
    console.error('DELETE works error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
