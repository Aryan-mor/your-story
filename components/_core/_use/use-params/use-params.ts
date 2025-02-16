'use client';
import { useParams as useNextParams } from 'next/navigation';

type Params = {
  storyId: Story['id'] | undefined;
};

export default function useParams() {
  const params = useNextParams();
  return params as Params;
}
