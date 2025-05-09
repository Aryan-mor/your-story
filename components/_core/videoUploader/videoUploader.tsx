'use client';
import { useOpen } from '@/utils/use-open';
import { tw } from '@/utils/tw';
import VideoUploaderModal, {
  VideoUploaderModalProps,
} from './videoUploader.modal';
import Button from '../button/button';

export const videoPlaceholder = 'https://placehold.co/900x1600';

export default function VideoUploader({
  scope,
  label,
  video,
  isDisabled,
  classNames,
  onVideoChange,
}: {
  isDisabled?: undefined | boolean;
  label?: undefined | string;
  video: null | Video;
} & Pick<VideoProps, 'classNames'> &
  Pick<VideoUploaderModalProps, 'onVideoChange' | 'scope'>) {
  const { isOpen, onOpen, onClose } = useOpen();

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="w-full text-start">{label}</span>}
      <Video
        video={video}
        classNames={classNames}
        onClick={!isDisabled ? onOpen : undefined}
      />
      <VideoUploaderModal
        scope={scope}
        isOpen={isOpen}
        onVideoChange={(video) => {
          onVideoChange(video);
          onClose();
        }}
        onClose={onClose}
      />
    </div>
  );
}

type VideoProps = {
  isDisabled?: undefined | boolean;
  video: null | Video;
  classNames?:
    | undefined
    | {
        wrapper?: undefined | string;
      };
  onClick?: () => void;
};

export function Video({ video, onClick, classNames }: VideoProps) {
  return (
    <div className="flex flex-col gap-4">
      {video?.secure_url ? (
        <video
          src={video?.secure_url ?? videoPlaceholder}
          className={tw(
            'rounded-sm w-full h-auto',
            {
              'cursor-pointer': !!onClick,
            },
            classNames?.wrapper,
          )}
          controls
        />
      ) : (
        <div>
          <span>No video selected</span>
        </div>
      )}
      <Button className="w-fit" onPress={onClick}>
        Upload
      </Button>
    </div>
  );
}
