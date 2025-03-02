'use client';
import { useParams } from 'next/navigation';

export default function PlayLevel() {
  const { storyId, levelId } = useParams();
  return (
    <div>
      Level {storyId} - {levelId}
    </div>
  );
}
