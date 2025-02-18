'use client';
import useParams from '@/components/_core/_use/use-params/use-params';
import { useStory, useUpdateStory } from '@/req/use-stories';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import Input from '@/components/_core/_form/input/input';
import ImageUploader from '@/components/_core/imageUploader/ImageUploader';
import Button from '@/components/_core/button/button';
import { useRouter } from 'next/navigation';
import useLoading from '@/utils/use-loading';

type FormData = Pick<Story, 'title' | 'description' | 'thumbnail'>;
export default function UploadForm() {
  const router = useRouter();
  const { storyId } = useParams();
  const { data: story } = useStory({
    id: storyId,
  });
  const updateStory = useUpdateStory();
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormData>();
  const { isLoading, onLoadingStart, onLoadingFinished } = useLoading();

  const thumbnail = watch('thumbnail');

  useEffect(() => {
    if (!story) return;
    reset(story);
  }, [reset, story]);

  const onDone = useCallback(() => {
    router.push('/admin');
  }, [router]);

  const onSubmit = useCallback(
    (form: FormData) => {
      updateStory.mutate(form, {
        onSuccess: () => {
          onDone();
        },
      });
    },
    [onDone, updateStory],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-5">
      <Input
        isDisabled={isLoading}
        label="Title"
        className="w-1/3"
        {...register('title')}
      />
      <Input
        isDisabled={isLoading}
        label="Description"
        className="w-1/3"
        {...register('description')}
      />
      <ImageUploader
        label="Thumbnail"
        isDisabled={isLoading}
        image={thumbnail}
        classNames={{
          wrapper: 'w-[150px]',
        }}
        onImageChange={(image) => setValue('thumbnail', image)}
      />
      <div className="flex w-full gap-3 justify-end bg-gray-100 p-2 rounded-md">
        <Button isDisabled={isLoading} onPress={onDone}>
          Close
        </Button>
        <Button
          isLoading={isLoading}
          variant="solid"
          color="primary"
          onPress={() => handleSubmit(onSubmit)()}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
