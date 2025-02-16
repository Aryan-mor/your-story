import { Accordion, AccordionItem } from '@heroui/react';
import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { flexCenterStyles } from '../../../styles/flex';

export default function MoreDetailModule({
  children,
}: {
  children: JSX.Element;
}) {
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

  const isOpen = useMemo(() => selectedKeys.size === 1, [selectedKeys.size]);

  const handleChange = useCallback(
    () => setSelectedKeys(isOpen ? new Set() : new Set(['show-more'])),
    [isOpen],
  );

  return (
    <Accordion
      className="px-0"
      selectedKeys={selectedKeys}
      onSelectionChange={handleChange}
    >
      <AccordionItem
        key="show-more"
        indicator={<Fragment />}
        title={
          <div className={flexCenterStyles('select-none text-sm')}>
            {isOpen ? t('Show less') : t('Show more')}{' '}
            <ChevronUp
              className={clsx('ml-1 mt-0.5 transition-all duration-400', {
                'rotate-180': !isOpen,
              })}
              size={18}
            />
          </div>
        }
      >
        {children}
      </AccordionItem>
    </Accordion>
  );
}
