import Input from '@/components/_core/_form/input/input';
import Drawer, { DrawerProps } from '@/components/_core/drawer/drawer';
import ImageUploader from '@/components/_core/imageUploader/ImageUploader';
import { useLevel, useUpdateLevel } from '@/req/use-levels';
import useLoading from '@/utils/use-loading';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ClickableZone from '../../../types/clickableZone/clickableZone';
import ClickableZonePreview from '../clickable-zone/preview.clickable-zone';
import Button from '@/components/_core/button/button';
import { Plus } from 'lucide-react';
import CArray from '@/utils/cArray';
import useDrawer from '@/components/_core/drawer/use.drawer';
import AddEditClicableZone from '../clickable-zone/add-edit.clickable-zone.drawer';

type UpdateLevelDrawerProps = {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
} & Omit<DrawerProps, 'footer'>;

type FormData = Pick<Level, 'title' | 'image'>;

export default function UpdateLevelDrawer({
  storyId,
  levelId,
  ...props
}: UpdateLevelDrawerProps) {
  const { data: level } = useLevel({
    id: levelId,
    storyId,
  });
  const updateLevel = useUpdateLevel({ storyId });
  const isFormInit = useRef(false);
  const {
    handleOpenDrawer: handleOpenClickableZoneDrawer,
    renderDrawer: renderClickableZoneDrawer,
  } = useDrawer(AddEditClicableZone);

  const { isLoading, onLoadingStart, onLoadingFinished } = useLoading();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormData>();

  const image = watch('image');
  useEffect(() => {
    if (!level || isFormInit.current) return;
    isFormInit.current = true;
    reset({ ...level });
  }, [level, reset]);

  const onSubmit = useCallback(
    (form: FormData) => {
      onLoadingStart();
      updateLevel.mutate(form, {
        onSuccess: () => {
          props.onClose();
        },
        onSettled: () => {
          onLoadingFinished();
        },
      });
    },
    [onLoadingFinished, onLoadingStart, props, updateLevel],
  );

  return (
    <Drawer
      size="3xl"
      title="Edit level"
      footer={{
        closeButtonAction: {
          isDisabled: isLoading,
        },
        primaryAction: {
          children: 'Save',
          variant: 'solid',
          color: 'primary',
          isLoading: isLoading,
          onPress: () => handleSubmit(onSubmit)(),
        },
      }}
      {...props}
    >
      <Input isDisabled={isLoading} label="Title" {...register('title')} />
      <ImageUploader
        scope={storyId}
        label="Thumbnail"
        isDisabled={isLoading}
        image={image}
        classNames={{
          wrapper: 'w-[150px]',
        }}
        onImageChange={(image) => setValue('image', image)}
      />
      <div className="flex flex-col gap-[inherit]">
        <span className="text-lg font-samibold">Clicable zone</span>
        {CArray.isEmpty(level?.clickableZone) && (
          <span className="text-gray-600 text-sm">
            No clickable zone in this level
          </span>
        )}
        {level?.clickableZone.map((clickableZone) => (
          <ClickableZonePreview
            key={clickableZone.id}
            levelId={levelId}
            storyId={storyId}
            clickableZoneId={clickableZone.id}
          />
        ))}
        <Button
          className="w-fit"
          color="primary"
          startContent={<Plus />}
          onPress={() =>
            handleOpenClickableZoneDrawer({
              storyId,
              levelId,
              clicableZoneId: undefined,
            })
          }
        >
          Add clickable zone
        </Button>
      </div>
      {renderClickableZoneDrawer}
    </Drawer>
  );
}
