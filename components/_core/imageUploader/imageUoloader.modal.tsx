'use client'; // Mark the component as a Client Component

import { useEffect, useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import Button from '../button/button';
import Modal, { ModalProps } from '../modal/modal';
import { Spinner, Image } from '@heroui/react';

export type ImageUploaderModalProps = {
  onImageChange: (image: Image) => void;
} & Omit<ModalProps, 'footer'>;

export default function ImageUploaderModal({
  onImageChange,
  ...props
}: ImageUploaderModalProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch images from Cloudinary
  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cloudinary/images');
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!props.isOpen) return;
    fetchImages();
  }, [props.isOpen]);

  // Handle image upload
  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        // Upload image to Cloudinary
        const response = await fetch('/api/cloudinary/upload', {
          method: 'POST',
          body: JSON.stringify({ image: base64Image }),
          headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        if (result.url) {
          fetchImages(); // Refresh image list
        }
      };
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (publicId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cloudinary/delete', {
        method: 'POST',
        body: JSON.stringify({ publicId }),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (result.success) {
        fetchImages(); // Refresh image list
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setIsLoading(false);
    }
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
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 max-h-[70vh] overflow-y-auto">
          {images.map((image) => (
            <div key={image.public_id} className="relative w-[150px]">
              <Image
                src={image.secure_url}
                alt="Cloudinary Image"
                className="cursor-pointer object-contain"
                onClick={() => onImageChange(image)}
              />
              <Button
                isIconOnly
                color="danger"
                size="sm"
                className="absolute top-1 right-1"
                onPress={() => handleDeleteImage(image.public_id)}
              >
                <Trash2 />
              </Button>
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
