import { useLevel, useRemoveLevel } from '@/req/use-levels';
import { tw } from '@/utils/tw';
import { Network, Pencil, Trash2 } from 'lucide-react';
import { Image } from '@/components/_core/imageUploader/ImageUploader';
import useDrawer from '@/components/_core/drawer/use.drawer';
import UpdateLevelDrawer from './update.level.drawer';
import Button from '@/components/_core/button/button';
import useModal from '@/components/_core/modal/use.modal';
import DeleteActionModal from '@/components/_core/modal/action-modal/delete.action.modal';
import { useCallback } from 'react';
import useLoading from '@/utils/use-loading';

type PreviewLevelFormProps = {
  classNames?: {
    base?: string | undefined;
  };
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
};

export default function PreviewLevelForm({
  storyId,
  levelId,
  classNames,
}: PreviewLevelFormProps) {
  const { data: level } = useLevel({
    id: levelId,
    storyId,
  });
  const removeLevel = useRemoveLevel({ storyId });
  const { renderDrawer, handleOpenDrawer } = useDrawer(UpdateLevelDrawer);
  const { handleOpenModal: handleRemoveModal, renderModal: renderRemoveModal } =
    useModal(DeleteActionModal);
  const { isLoading, onLoadingFinished, onLoadingStart } = useLoading();

  const handleRemove = useCallback(() => {
    if (!levelId) return;
    onLoadingStart();
    removeLevel.mutate(levelId, {
      onSettled: onLoadingFinished,
    });
  }, [levelId, onLoadingFinished, onLoadingStart, removeLevel]);

  return (
    <div
      className={tw(
        'w-full flex justify-between border rounded-xl gap-8 shadow-sm p-3 text-left',
        classNames?.base,
      )}
    >
      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <span className="flex text-lg font-semibold items-center gap-2 ">
            <Network size={23} /> {level?.title}
          </span>
          <div className="flex gap-2">
            <Button
              isIconOnly
              isDisabled={isLoading}
              onPress={() =>
                handleOpenDrawer({
                  storyId,
                  levelId,
                })
              }
            >
              <Pencil />
            </Button>
            <Button
              isIconOnly
              color="danger"
              isLoading={isLoading}
              onPress={() =>
                handleRemoveModal({
                  primaryAction: {
                    onPress: handleRemove,
                  },
                })
              }
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </div>
      <Image
        image={level?.image ?? null}
        classNames={{
          wrapper: 'w-[150px]',
        }}
      />
      {renderDrawer}
      {renderRemoveModal}
    </div>
  );
}
