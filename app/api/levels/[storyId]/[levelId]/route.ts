import Database, { DataType } from '@/app/api/database/database';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: { params: Promise<{ storyId: Story['id']; levelId: Level['id'] }> },
) {
  const { storyId, levelId } = await params;

  try {
    const stories: Story[] | null = await Database.readData(DataType.Stories);
    const story = stories?.find((story) => story.id === storyId);
    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const newStory: Story = {
      ...story,
      levels: story.levels.filter((lvlId) => lvlId !== levelId),
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
