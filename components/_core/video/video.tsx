'use client';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

type VideoProps = {
  video: undefined | null | Video;
} & Omit<ReactPlayerProps, 'url'>;

export default function Video({ video, ...props }: VideoProps) {
  return (
    <ReactPlayer
      url={video?.secure_url}
      controls={false}
      playing={true}
      muted={true}
      loop={false}
      width="100%"
      height="100%"
      {...props}
    />
  );
}
