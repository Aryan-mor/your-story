import { Modal, type ModalProps } from '@heroui/react';
import { twMerge } from 'tailwind-merge';

export const modalPX = 'px-4';
const modalPY = 'py-4';
const modalFooterAndHeaderPY = 'py-2';

export default function BaseModal({ classNames, ...props }: ModalProps) {
  return (
    <Modal
      {...props}
      classNames={{
        ...classNames,
        backdrop: twMerge('pointer-events-none', classNames?.backdrop),
        header: twMerge(
          `${modalPX} ${modalFooterAndHeaderPY} gap-4 z-20`,
          classNames?.header,
        ),
        body: twMerge(`${modalPX} ${modalPY} z-10 gap-4`, classNames?.body),
        footer: twMerge(
          `${modalPX} ${modalFooterAndHeaderPY} gap-4`,
          classNames?.footer,
        ),
        closeButton: twMerge('z-30', classNames?.closeButton),
      }}
    />
  );
}
