import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pushErrorNotification } from './_core/error.ai';
const ImagesKey = 'images';
export const useImages = (scope: string) => {
  return useQuery({
    queryKey: [ImagesKey, scope],
    queryFn: () => {
      return fetch('/api/cloudinary/images')
        .then((res) => res?.json())
        .then((data) => (data?.images ?? []) as Image[]);
    },
  });
};

export const useAddImage = (scope: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (base64Image: string) => {
      return fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: JSON.stringify({ image: base64Image, scope }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((image) => image as Image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ImagesKey, scope] });
    },
    onError: pushErrorNotification,
  });
};

export const useRemoveImage = (scope: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (publicId: Image['public_id']) => {
      return fetch('/api/cloudinary/delete', {
        method: 'POST',
        body: JSON.stringify({ publicId }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((res) => res as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ImagesKey, scope] });
    },
    onError: pushErrorNotification,
  });
};
