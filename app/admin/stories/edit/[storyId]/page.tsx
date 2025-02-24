'use client';
import useParams from '@/components/_core/_use/use-params/use-params';
import { useStory, useUpdateStory } from '@/req/use-stories';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useRef } from 'react';
import Input from '@/components/_core/_form/input/input';
import ImageUploader from '@/components/_core/imageUploader/ImageUploader';
import Button from '@/components/_core/button/button';
import { useRouter } from 'next/navigation';
import useLoading from '@/utils/use-loading';
import PreviewLevelForm from '@/components/admin/level/preview.form.level';
import { Plus } from 'lucide-react';
import CreateLevelModal from '@/components/admin/level/create.level.modal';
import useModal from '@/components/_core/modal/use.modal';
import { SelectItem, Spinner } from '@heroui/react';
import Textarea from '@/components/_core/_form/textarea/textarea';
import { pick } from 'radash';
import VideoUploader from '@/components/_core/videoUploader/videoUploader';
import Select from '@/components/_core/_form/select/select';
import { useLevels, useObjectifyLevels } from '@/req/use-levels';

type FormData = Pick<
  Story,
  'title' | 'description' | 'startLevelId' | 'thumbnail' | 'introAnimation'
>;
export default function UploadForm() {
  const router = useRouter();
  const { storyId } = useParams();
  const { data: story, isLoading: isStoryLoading } = useStory({
    id: storyId,
  });
  const { data: levels } = useObjectifyLevels({
    storyId,
  });
  const updateStory = useUpdateStory();
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormData>();
  const { isLoading, onLoadingStart, onLoadingFinished } = useLoading();
  const isFormInit = useRef(false);
  const {
    renderModal: renderLevelFormDrawer,
    handleOpenModal: handleOpenLevelFormDrawer,
  } = useModal(CreateLevelModal);

  const thumbnail = watch('thumbnail');
  const introAnimation = watch('introAnimation');
  const startLevelId = watch('startLevelId');
  useEffect(() => {
    if (!story || isFormInit.current) return;
    isFormInit.current = true;
    reset(
      pick(story, [
        'id',
        'title',
        'description',
        'startLevelId',
        'thumbnail',
        'introAnimation',
      ]),
    );
  }, [reset, story]);

  const onDone = useCallback(() => {
    router.push('/admin');
  }, [router]);

  const onSubmit = useCallback(
    (form: FormData) => {
      onLoadingStart();
      updateStory.mutate(form, {
        onSuccess: () => {
          onDone();
        },
        onSettled: () => {
          onLoadingFinished();
        },
      });
    },
    [onDone, onLoadingFinished, onLoadingStart, updateStory],
  );

  if (isStoryLoading || !story) return <Spinner />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-5">
        <Input isDisabled={isLoading} label="Title" {...register('title')} />
        <Textarea
          isDisabled={isLoading}
          label="Description"
          {...register('description')}
        />
        <Select
          label="Start level"
          isDisabled={isLoading}
          selectedKeys={startLevelId ? [startLevelId] : []}
          onChange={(e) => {
            if (!e.target.value) return;
            return setValue('startLevelId', e.target.value as Level['id']);
          }}
        >
          {(story?.levels ?? []).map((levelId) => (
            <SelectItem key={levelId} value={levelId}>
              {levels?.[levelId]?.title}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex justify-center">
        <ImageUploader
          scope={storyId}
          label="Thumbnail"
          isDisabled={isLoading}
          image={thumbnail}
          classNames={{
            wrapper: 'w-[150px]',
          }}
          onImageChange={(image) => setValue('thumbnail', image)}
        />
      </div>
      <div className="flex justify-center">
        <VideoUploader
          scope={storyId}
          label="Intro animation"
          isDisabled={isLoading}
          video={introAnimation}
          classNames={{
            wrapper: 'w-[150px]',
          }}
          onVideoChange={(video) => setValue('introAnimation', video)}
        />
      </div>
      <div className="grid grid-cols-2 col-span-3 pt-5 gap-4">
        {story?.levels.map((levelId) => (
          <PreviewLevelForm key={levelId} storyId={storyId} levelId={levelId} />
        ))}
      </div>
      <div className="w-full flex justify-start">
        <Button
          color="primary"
          isDisabled={isLoading}
          startContent={<Plus />}
          onPress={() => handleOpenLevelFormDrawer({ storyId })}
        >
          Add new level
        </Button>
      </div>
      <span className="h-16" />
      <div className="z-30 h-16 items-center fixed bottom-0 w-full left-0 flex justify-center bg-gray-100/60 backdrop-blur-sm p-2 rounded-md">
        <div className="container flex gap-3 justify-end">
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
      </div>
      {renderLevelFormDrawer}
    </form>
  );
}
