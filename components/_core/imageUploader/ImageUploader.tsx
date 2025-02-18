'use client'; // Mark the component as a Client Component
import { Fragment } from 'react';
import { Image, ImageProps } from '@heroui/react';
import ImageUploaderModal, {
  ImageUploaderModalProps,
} from './imageUoloader.modal';
import { useOpen } from '@/utils/use-open';
import { tw } from '@/utils/tw';

export default function ImageUploader({
  label,
  image,
  isDisabled,
  classNames,
  onImageChange,
}: {
  isDisabled?: undefined | boolean;
  label?: undefined | string;
  image: undefined | Image;
} & Pick<ImageProps, 'classNames'> &
  Pick<ImageUploaderModalProps, 'onImageChange'>) {
  const { isOpen, onOpen, onClose } = useOpen();

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="w-full text-start">{label}</span>}
      <Image
        src={image?.secure_url ?? 'https://placehold.co/900x1600'}
        fallbackSrc="https://placehold.co/900x1600"
        classNames={{
          ...classNames,
          wrapper: tw('cursor-pointer rounded-sm', classNames?.wrapper),
          img: tw('aspect-[9/16]', classNames?.img),
        }}
        onClick={!isDisabled ? onOpen : undefined}
      />
      <ImageUploaderModal
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
