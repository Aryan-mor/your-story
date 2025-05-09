import Database, { DataType } from '../database/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = (await Database.readData(DataType.Levels)) as Story[];
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
