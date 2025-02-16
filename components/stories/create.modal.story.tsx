import { useForm } from 'react-hook-form';
import ActionModal, {
  ActionModalProps,
} from '../_core/modal/action-modal/action.modal';
import Input from '../_core/_form/input/input';
import { useCallback } from 'react';
import { useUpdateStory } from '@/req/use-stories';
import useLoading from '@/utils/use-loading';
import { useRouter } from 'next/navigation';

type CreateStoryModalProps = Omit<
  ActionModalProps,
  'primaryAction' | 'closeButtonAction'
>;
export default function CreateStoryModal(props: CreateStoryModalProps) {
  const updateStory = useUpdateStory();
  const { register, handleSubmit } = useForm<Pick<Story, 'title'>>();
  const { isLoading, onLoadingFinished, onLoadingStart } = useLoading();
  const router = useRouter();

  const handleSubmitClicked = useCallback(
    (data: Pick<Story, 'title'>) => {
      if (data.title.trim() === '') {
        return;
      }
      onLoadingStart();
      updateStory.mutate(
        { title: data.title },
        {
          onSuccess: (story) => {
            props.onClose();
            router.push('/panel/stories/edit/' + story.id);
          },
          onSettled: onLoadingFinished,
        },
      );
    },
    [onLoadingFinished, onLoadingStart, updateStory],
  );

  return (
    <ActionModal
      title="Create Story"
      {...props}
      isLoading={isLoading}
      primaryAction={{
        children: 'Create Story',
        isLoading: isLoading,
        onPress: handleSubmit(handleSubmitClicked),
      }}
    >
      <Input label="Title" {...register('title')} />
    </ActionModal>
  );
}
