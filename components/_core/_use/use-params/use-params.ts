'use client';
import { useParams as useNextParams } from 'next/navigation';

type Params = Partial<{
  storyId: Story['id'];
  levelId: Level['id'];
  zoneId: ClickableZone['id'];
}>;

export default function useParams() {
  return useNextParams<Params>();
}
