'use client'; // Mark the component as a Client Component
import {
  Image as HeroUiImage,
  ImageProps as HeroUiImageProps,
} from '@heroui/react';
import ImageUploaderModal, {
  ImageUploaderModalProps,
} from './imageUoloader.modal';
import { useOpen } from '@/utils/use-open';
import { tw } from '@/utils/tw';

export const imagePlaceholder = 'https://placehold.co/900x1600';

export default function ImageUploader({
  scope,
  label,
  image,
  isDisabled,
  classNames,
  onImageChange,
}: {
  isDisabled?: undefined | boolean;
  label?: undefined | string;
  image: null | Image;
} & Pick<ImageProps, 'classNames'> &
  Pick<ImageUploaderModalProps, 'onImageChange' | 'scope'>) {
  const { isOpen, onOpen, onClose } = useOpen();

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="w-full text-start">{label}</span>}
      <Image
        image={image}
        classNames={classNames}
        onClick={!isDisabled ? onOpen : undefined}
      />
      <ImageUploaderModal
        scope={scope}
        isOpen={isOpen}
        onImageChange={(image) => {
          onImageChange(image);
          onClose();
        }}
        onClose={onClose}
      />
    </div>
  );
}

type ImageProps = {
  isDisabled?: undefined | boolean;
  image: null | Image;
} & Pick<HeroUiImageProps, 'classNames' | 'onClick'>;

export function Image({ image, onClick, classNames }: ImageProps) {
  return (
    <HeroUiImage
      src={image?.secure_url ?? imagePlaceholder}
      fallbackSrc={imagePlaceholder}
      classNames={{
        ...classNames,
        wrapper: tw(
          'rounded-sm',
          {
            'cursor-pointer': !!onClick,
          },
          classNames?.wrapper,
        ),
        img: tw('aspect-[9/16] shadow-sm', classNames?.img),
      }}
      onClick={onClick ?? (() => {})}
    />
  );
}
