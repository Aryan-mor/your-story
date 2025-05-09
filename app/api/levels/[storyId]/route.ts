import { NextRequest, NextResponse } from 'next/server';
import Database, { DataType } from '../../database/database';
import { unique } from 'radash';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ storyId: Story['id'] }> },
) {
  const { storyId } = await params;
  try {
    const data = (await Database.readData(DataType.Stories)) as Story[];
    const story = data.find((story) => story.id === storyId);
    const levelIds = story?.levels ?? [];
    const dbLevels = (await Database.readData(DataType.Levels)) as Level[];
    const filterdLevels = dbLevels?.filter((level) =>
      levelIds.includes(level.id),
    );

    return NextResponse.json(filterdLevels ?? []);
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ storyId: Story['id'] }> },
) {
  const level: Level = await req.json();

  const { storyId } = await params;

  try {
    const stories: Story[] | null = await Database.readData(DataType.Stories);
    const story = stories?.find((story) => story.id === storyId);
    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const serverLevel = await Database.upsertItem(DataType.Levels, level);
    if (!serverLevel) {
      return NextResponse.json({ error: "Could't create" }, { status: 404 });
    }

    const newStory: Story = {
      ...story,
      levels: unique([...story.levels, serverLevel.id]),
    };
    await Database.upsertItem(DataType.Stories, newStory);

    return NextResponse.json({ success: true, story: newStory });
  } catch {
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 },
    );
  }
}
