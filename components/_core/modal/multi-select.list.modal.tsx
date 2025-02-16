import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BorderButton } from '../../../atoms/buttons/border-button';
import { SolidButton } from '../../../atoms/buttons/solid-button';
import ListModal, { type ListModalProps } from './list.modal';

type MultiSelectListModal<ITEM, KEY extends keyof ITEM> = {
  keyOfItem: KEY;
  isLoading?: undefined | boolean;
  renderItem: (
    item: ITEM,
    {
      isSelected,
      onSelect,
    }: {
      isSelected: boolean;
      onSelect: () => void;
    },
  ) => JSX.Element;
  onSave: (selectedItems: ITEM[KEY][]) => void;
} & Omit<ListModalProps<ITEM>, 'renderItem' | 'footerActions'>;

export default function MultiSelectListModal<ITEM, KEY extends keyof ITEM>({
  keyOfItem,
  renderItem,
  onSave,
  onClose,
  isLoading,
  isOpen,
  ...props
}: MultiSelectListModal<ITEM, KEY>) {
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState<Set<ITEM[keyof ITEM]>>(new Set());
  const handleSelect = useCallback(
    (item: ITEM) =>
      setSelectedKeys((oldSelectedKeys) => {
        const selectedKeys = new Set(oldSelectedKeys);
        if (selectedKeys.has(item[keyOfItem])) {
          selectedKeys.delete(item[keyOfItem]);
        } else {
          selectedKeys.add(item[keyOfItem]);
        }
        return selectedKeys;
      }),
    [setSelectedKeys, keyOfItem],
  );

  const handleSave = useCallback(
    () => onSave(Array.from(selectedKeys) as ITEM[KEY][]),
    [onSave, selectedKeys],
  );

  useEffect(() => {
    if (isOpen) return;
    setSelectedKeys(new Set());
  }, [isOpen]);

  return (
    <ListModal
      isOpen={isOpen}
      onClose={onClose}
      resultSuffix={
        <span className="text-xs">
          ({t('Selected')}: {selectedKeys.size})
        </span>
      }
      renderItem={(item) =>
        renderItem(item, {
          isSelected: selectedKeys.has(item[keyOfItem]),
          onSelect: handleSelect.bind(null, item),
        })
      }
      footerActions={() => (
        <div className="flex w-full justify-between">
          <BorderButton disabled={isLoading} onClick={onClose}>
            {t('Close')}
          </BorderButton>
          <SolidButton
            loading={isLoading}
            onClick={handleSave}
            disabled={selectedKeys?.size === 0}>
            {t('Save')}
          </SolidButton>
        </div>
      )}
      {...props}
    />
  );
}
