import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import useLoading from '@/utils/use-loading';
import ActionModal, {
  ActionModalProps,
} from '@/components/_core/modal/action-modal/action.modal';
import Input from '@/components/_core/_form/input/input';
import { useUpdateLevel } from '@/req/use-levels';

type CreateLevelModalProps = { storyId: Story['id'] | undefined } & Omit<
  ActionModalProps,
  'primaryAction' | 'closeButtonAction'
>;
export default function CreateLevelModal({
  storyId,
  ...props
}: CreateLevelModalProps) {
  const updateLevel = useUpdateLevel({ storyId });
  const { register, handleSubmit, reset } = useForm<Pick<Level, 'title'>>();
  const { isLoading, onLoadingFinished, onLoadingStart } = useLoading();

  const handleSubmitClicked = useCallback(
    (data: Pick<Level, 'title'>) => {
      if (data.title.trim() === '') {
        return;
      }
      onLoadingStart();
      updateLevel.mutate(
        { title: data.title },
        {
          onSuccess: ({ story }: { story: Story }) => {
            props.onClose();
            reset();
            console.log('jshafjhjsahjfhsaf new level', { storyId, story });
            //TODO open level edit modal
          },
          onSettled: onLoadingFinished,
        },
      );
    },
    [onLoadingFinished, onLoadingStart, props, reset, storyId, updateLevel],
  );

  return (
    <ActionModal
      title="Create Level"
      {...props}
      primaryAction={{
        children: 'Create Level',
        isLoading: isLoading,
        onPress: () => handleSubmit(handleSubmitClicked)(),
      }}
    >
      <Input label="Title" {...register('title')} />
    </ActionModal>
  );
}
