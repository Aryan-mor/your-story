import Input from '@/components/_core/_form/input/input';
import Drawer, { DrawerProps } from '@/components/_core/drawer/drawer';
import { useClickableZone } from '@/req/use-clickable-zone';
import useLoading from '@/utils/use-loading';
import { Fragment, useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ClickableZoneOption from '../../../.history/types/clickableZone/option.clickableZone_20250223112034';
import { defaultClickableZoneOption } from '@/types/clickableZone/option.clickableZone';
import {
  useClicableZoneOption,
  useUpdateClickableZoneOption,
} from '@/req/use-clickable-zone-option';
import Select from '@/components/_core/_form/select/select';
import { useLevel, useObjectifyLevels } from '@/req/use-levels';
import { useStory } from '@/req/use-stories';
import { SelectItem } from '@heroui/react';
import ImageUploader from '@/components/_core/imageUploader/ImageUploader';
import VideoUploader, {
  Video,
} from '@/components/_core/videoUploader/videoUploader';
import { pick } from 'radash';

type AddEditOptionProps = {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  clickableZoneId: undefined | ClickableZone['id'];
  clickableZoneOptionId: undefined | ClickableZoneOption['id'];
} & DrawerProps;

type FormData = {
  clickableZoneOption: Pick<
    ClickableZoneOption,
    'text' | 'nextLevelId' | 'transitionAnimation'
  >;
};

export default function AddEditOptionDrawer({
  storyId,
  levelId,
  clickableZoneId,
  clickableZoneOptionId,
  ...props
}: AddEditOptionProps) {
  const isFormInit = useRef(false);
  const { data: story } = useStory({
    id: storyId,
  });
  const { data: levels } = useObjectifyLevels({
    storyId,
  });
  const { data: clickableZoneOptionBase } = useClicableZoneOption({
    storyId,
    levelId,
    clickableZoneId,
    id: clickableZoneOptionId,
  });
  const updateClickableZoneOption = useUpdateClickableZoneOption({
    levelId,
    storyId,
    clickableZoneId,
  });

  const { isLoading, onLoadingStart, onLoadingFinished } = useLoading();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormData>();

  const clickableZoneOption = watch('clickableZoneOption');

  useEffect(() => {
    if (isFormInit.current) return;
    if (clickableZoneOptionId && !clickableZoneOptionBase) return;
    isFormInit.current = true;
    reset({
      clickableZoneOption: pick(
        {
          ...defaultClickableZoneOption,
          ...(clickableZoneOptionBase ?? {}),
        },
        ['id', 'text', 'nextLevelId', 'transitionAnimation'],
      ),
    });
  }, [clickableZoneId, clickableZoneOptionBase, clickableZoneOptionId, reset]);

  const onSubmit = useCallback(
    (form: FormData) => {
      onLoadingStart();
      updateClickableZoneOption({
        nextLevelId: form.clickableZoneOption?.nextLevelId ?? undefined,
        text: form.clickableZoneOption?.text ?? undefined,
        transitionAnimation:
          form.clickableZoneOption?.transitionAnimation ?? undefined,
      })
        ?.then(() => {
          props.onClose();
        })
        .finally(() => {
          onLoadingFinished();
        });
    },
    [onLoadingFinished, onLoadingStart, props, updateClickableZoneOption],
  );

  return (
    <Drawer
      size="3xl"
      title={clickableZoneOptionId ? 'Update option' : 'Create option'}
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
      {clickableZoneOption ? (
        <Fragment>
          <Input
            isDisabled={isLoading}
            label="Text"
            {...register('clickableZoneOption.text')}
          />
          <Select
            label="Select next level"
            isDisabled={isLoading}
            selectedKeys={
              clickableZoneOption.nextLevelId
                ? [clickableZoneOption.nextLevelId]
                : []
            }
            onChange={(e) => {
              if (!e.target.value) return;
              return setValue(
                'clickableZoneOption.nextLevelId',
                e.target.value as Level['id'],
              );
            }}
          >
            {(story?.levels ?? []).map((levelId) => (
              <SelectItem key={levelId} value={levelId}>
                {levels?.[levelId]?.title}
              </SelectItem>
            ))}
          </Select>
          <div className="max-w-[150px]">
            <VideoUploader
              isDisabled={isLoading}
              video={clickableZoneOption.transitionAnimation}
              onVideoChange={(video) =>
                setValue('clickableZoneOption.transitionAnimation', video)
              }
              scope={levelId}
            />
          </div>
        </Fragment>
      ) : (
        'Loading ...'
      )}
    </Drawer>
  );
}
