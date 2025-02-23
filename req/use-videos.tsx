import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pushErrorNotification } from './_core/error.ai';
const VideosKey = 'video';
export const useVideos = (scope: string) => {
  return useQuery({
    queryKey: [VideosKey, scope],
    queryFn: () => {
      return fetch('/api/cloudinary/videos')
        .then((res) => res?.json())
        .then((data) => (data?.videos ?? []) as Video[]);
    },
  });
};

export const useAddVideo = (scope: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (base64Video: string) => {
      return fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: JSON.stringify({ video: base64Video, scope }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((Video) => Video as Video);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VideosKey, scope] });
    },
    onError: pushErrorNotification,
  });
};

export const useRemoveVideo = (scope: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (publicId: Video['public_id']) => {
      return fetch('/api/cloudinary/delete', {
        method: 'POST',
        body: JSON.stringify({ publicId }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((res) => res as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VideosKey, scope] });
    },
    onError: pushErrorNotification,
  });
};
