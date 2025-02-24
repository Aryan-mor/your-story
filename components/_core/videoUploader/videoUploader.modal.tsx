'use client';

import { Upload, Trash2 } from 'lucide-react';
import Button from '../button/button';
import Modal, { ModalProps } from '../modal/modal';
import { Spinner } from '@heroui/react';
import { useAddVideo, useVideos, useRemoveVideo } from '@/req/use-videos';
import useLoading from '@/utils/use-loading';
import DeleteWithAutoHandleActionModal from '../modal/action-modal/delete.with-auto-handle.action.modal';

export type VideoUploaderModalProps = {
  scope: undefined | string;
  onVideoChange: (video: Video) => void;
} & Omit<ModalProps, 'footer'>;

export default function VideoUploaderModal({
  scope = 'global',
  onVideoChange,
  ...props
}: VideoUploaderModalProps) {
  const { data: videos, isFetching } = useVideos(scope);
  const addVideo = useAddVideo(scope);
  const removeVideo = useRemoveVideo(scope);
  const { isLoading, onLoadingStart, onLoadingFinished } = useLoading();

  const handleUpload = async (file: File) => {
    onLoadingStart();
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Video = reader.result as string;
        addVideo.mutate(base64Video, {
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
      console.error('Error uploading video:', error);
    }
  };

  const handleDeleteVideo = async (publicId: Video['public_id']) => {
    onLoadingStart();
    removeVideo.mutate(publicId, {
      onSettled: onLoadingFinished,
    });
  };

  return (
    <Modal
      size="full"
      title="Select or Upload Video"
      {...props}
      footer={{
        primaryAction: {
          onPress: () => document.getElementById('upload-input')?.click(),
          children: 'Upload New Video',
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
          {videos?.map((video) => (
            <div key={video.public_id} className="relative w-[150px] group">
              <video
                src={video.secure_url}
                className="cursor-pointer object-contain w-full h-full"
                controls
                onClick={() => onVideoChange(video)}
              />
              <DeleteWithAutoHandleActionModal
                primaryAction={{
                  children: 'Remove video',
                  onPress: () => handleDeleteVideo(video.public_id),
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
        accept="video/*"
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
