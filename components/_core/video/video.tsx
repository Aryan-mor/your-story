'use client';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { Suspense } from 'react';

type VideoProps = {
  video: undefined | null | Video;
} & Omit<ReactPlayerProps, 'url'>;

export default function Video({ video, ...props }: VideoProps) {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <ReactPlayer
        url={video?.secure_url}
        controls={false}
        playing={true}
        muted={true}
        loop={false}
        width="100%"
        height="100%"
        playsinline={true}
        {...props}
      />
    </Suspense>
  );
}
