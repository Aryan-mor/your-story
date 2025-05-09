import useDrawer from '@/components/_core/drawer/use.drawer';
import AddEditOptionDrawer from './add-edit.option.drawer';
import Button from '@/components/_core/button/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useLevel } from '@/req/use-levels';
import DeleteWithAutoHandleActionModal from '@/components/_core/modal/action-modal/delete.with-auto-handle.action.modal';
import { useRemoveClickableZoneOption } from '@/req/use-clickable-zone-option';
import useLoading from '@/utils/use-loading';

export default function PreviewClickableZoneOption({
  storyId,
  levelId,
  clickableZoneId,
  clickableZoneOption,
}: {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  clickableZoneId: undefined | ClickableZone['id'];
  clickableZoneOption: undefined | ClickableZoneOption;
}) {
  const { isLoading, onLoadingStart, onLoadingFinished } = useLoading();
  const removeClickableZoneOption = useRemoveClickableZoneOption({
    levelId,
    storyId,
    clickableZoneId,
  });
  const {
    renderDrawer: renderAddEditOptionDrawer,
    handleOpenDrawer: handleOpenAddEditOptionDrawer,
  } = useDrawer(AddEditOptionDrawer);

  const { data: nextLevel } = useLevel({
    id: clickableZoneOption?.nextLevelId,
    storyId,
  });

  return (
    <div className="flex flex-col gap-3 w-full border rounded-lg p-3">
      <div className="flex gap-3 w-full justify-between items-center">
        <span className="text-base font-semibold">
          {clickableZoneOption?.text}
        </span>
        <span className="flex gap-3">
          <Button
            isIconOnly={true}
            isDisabled={isLoading}
            onPress={() =>
              handleOpenAddEditOptionDrawer({
                storyId,
                levelId,
                clickableZoneId,
                clickableZoneOptionId: clickableZoneOption?.id,
              })
            }
          >
            <Pencil />
          </Button>
          <DeleteWithAutoHandleActionModal
            primaryAction={{
              onPress: () => {
                if (!clickableZoneOption?.id) return;
                onLoadingStart();
                removeClickableZoneOption(clickableZoneOption.id)?.finally(
                  onLoadingFinished,
                );
              },
            }}
          >
            <Button isLoading={isLoading} isIconOnly={true}>
              <Trash2 />
            </Button>
          </DeleteWithAutoHandleActionModal>
        </span>
      </div>
      {nextLevel && (
        <span>
          <span className="text-gray-500 text-sm">Next level:</span>{' '}
          {nextLevel?.title}
        </span>
      )}
      {clickableZoneOption?.levelType && (
        <span>
          <span className="text-gray-500 text-sm">Level type:</span>{' '}
          {clickableZoneOption?.levelType}
        </span>
      )}
      {renderAddEditOptionDrawer}
    </div>
  );
}
