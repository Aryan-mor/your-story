import { NextRequest, NextResponse } from 'next/server';
import Database, { DataType } from '../database/database';

export async function GET() {
  try {
    const data = (await Database.readData(DataType.Stories)) as Story[];
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const story: Story = await req.json();

  try {
    await Database.upsertItem(DataType.Stories, story);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 },
    );
  }
}
