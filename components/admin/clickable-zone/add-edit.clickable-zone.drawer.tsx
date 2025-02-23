import Drawer, { DrawerProps } from '@/components/_core/drawer/drawer';
import LazyDrawer from '@/components/_core/drawer/lazy.drawer';
import {
  useClickableZone,
  useUpdateClickableZone,
} from '@/req/use-clickable-zone';
import useLoading from '@/utils/use-loading';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ChoseClickableZone from './chose.clickable-zone';
import ClickableZone, {
  defaultClickableZone,
} from '../../../types/clickableZone/clickableZone';
import Textarea from '@/components/_core/_form/textarea/textarea';
import { pick } from 'radash';

type AddEditClicableZoneProps = {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  clickableZoneId: undefined | ClickableZone['id'];
} & DrawerProps;

type FormData = {
  clickableZone: Pick<ClickableZone, 'options' | 'note' | 'radius' | 'x' | 'y'>;
};

function AddEditClicableZone({
  storyId,
  levelId,
  clickableZoneId,
  ...props
}: AddEditClicableZoneProps) {
  const isFormInit = useRef(false);
  const { data: clickableZoneBase } = useClickableZone({
    storyId,
    levelId,
    id: clickableZoneId,
  });

  const { isLoading, onLoadingStart, onLoadingFinished } = useLoading();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormData>();

  const updateClickableZone = useUpdateClickableZone({
    levelId,
    storyId,
  });

  const clickableZone = watch('clickableZone');

  useEffect(() => {
    if (isFormInit.current) return;
    if (clickableZoneId && !clickableZoneBase) return;
    isFormInit.current = true;
    reset({
      clickableZone: pick(
        {
          ...defaultClickableZone,
          ...(clickableZoneBase ?? {}),
        },
        ['options', 'note', 'radius', 'x', 'y'],
      ),
    });
  }, [clickableZone, clickableZoneBase, clickableZoneId, reset]);

  const onSubmit = useCallback(
    (form: FormData) => {
      onLoadingStart();
      updateClickableZone(form.clickableZone)
        ?.then(() => {
          props.onClose();
        })
        .finally(() => {
          onLoadingFinished();
        });
    },
    [onLoadingFinished, onLoadingStart, props, updateClickableZone],
  );

  return (
    <Drawer
      size="3xl"
      title={clickableZoneId ? 'Edit clicable zone' : 'Add clicable zone'}
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
      <Textarea label="Note" {...register('clickableZone.note')} />
      {clickableZoneBase && clickableZone ? (
        <ChoseClickableZone
          primaryClickableZone={{ ...clickableZoneBase, ...clickableZone }}
          storyId={storyId}
          levelId={levelId}
          onClickableZoneChange={(clickableZone) =>
            setValue('clickableZone', clickableZone)
          }
        />
      ) : (
        'Loading ...'
      )}
    </Drawer>
  );
}

export default LazyDrawer(AddEditClicableZone);
