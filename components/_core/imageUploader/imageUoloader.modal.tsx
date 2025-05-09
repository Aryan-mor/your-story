'use client'; // Mark the component as a Client Component

import { Trash2, Upload } from 'lucide-react';
import Button from '../button/button';
import Modal, { ModalProps } from '../modal/modal';
import { Image, Spinner } from '@heroui/react';
import { useAddImage, useImages, useRemoveImage } from '@/req/use-images';
import useLoading from '@/utils/use-loading';
import DeleteWithAutoHandleActionModal from '../modal/action-modal/delete.with-auto-handle.action.modal';

export type ImageUploaderModalProps = {
  scope: undefined | string;
  onImageChange: (image: Image) => void;
} & Omit<ModalProps, 'footer'>;

export default function ImageUploaderModal({
  scope = 'global',
  onImageChange,
  ...props
}: ImageUploaderModalProps) {
  const { data: images, isFetching } = useImages(scope);
  const addImage = useAddImage(scope);
  const removeImage = useRemoveImage(scope);
  const { isLoading, onLoadingStart, onLoadingFinished } = useLoading();

  // Handle image upload
  const handleUpload = async (file: File) => {
    onLoadingStart();
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        addImage.mutate(base64Image, {
          onSettled: () => {
            onLoadingFinished();
            const uploadInputDom = document.getElementById(
              'upload-input',
            ) as HTMLInputElement | null;
            if (uploadInputDom) uploadInputDom.value = '';
          },
        });
      };
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (publicId: Image['public_id']) => {
    onLoadingStart();
    removeImage.mutate(publicId, {
      onSettled: onLoadingFinished,
    });
  };

  return (
    <Modal
      size="full"
      title="Select or Upload Image"
      {...props}
      footer={{
        primaryAction: {
          onPress: () => document.getElementById('upload-input')?.click(),
          children: 'Upload New Image',
          color: 'primary',
          variant: 'solid',
          startContent: <Upload />,
        },
      }}
    >
      {isLoading || isFetching ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 max-h-[70vh] overflow-y-auto">
          {images?.map((image) => (
            <div key={image.public_id} className="relative w-[150px] group">
              <Image
                src={image.secure_url}
                alt="Cloudinary Image"
                className="cursor-pointer object-contain"
                onClick={() => onImageChange(image)}
              />
              <DeleteWithAutoHandleActionModal
                primaryAction={{
                  children: 'Remove image',
                  onPress: () => handleDeleteImage(image.public_id),
                }}
              >
                <Button
                  isIconOnly
                  color="danger"
                  size="sm"
                  variant="solid"
                  className="absolute top-1 right-1 z-10 hidden group-hover:flex"
                >
                  <Trash2 size={18} />
                </Button>
              </DeleteWithAutoHandleActionModal>
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
        className="hidden"
        id="upload-input"
      />
    </Modal>
  );
}
