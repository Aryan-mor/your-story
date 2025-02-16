import { NextRequest, NextResponse } from 'next/server';
import Database, { DataType } from '../database/database';

export async function GET() {
  return (await Database.readData(DataType.Levels)) as Story[];
}

export async function Path(req: NextRequest) {
  const level: Level = await req.json();

  try {
    await Database.upsertItem(DataType.Levels, level);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 },
    );
  }
}
