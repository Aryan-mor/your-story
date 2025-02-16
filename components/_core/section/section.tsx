import { CardBody, CardHeader, type CardProps } from '@heroui/react';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '../card/card';

type SectionSize = 'sm' | 'md' | 'lg';

export type SectionProps = {
  children: ReactNode;
  size?: undefined | SectionSize;
  onClick?: undefined | (() => void);
} & Pick<CardProps, 'classNames'>;

const sizeClassNames: Record<SectionSize, SectionProps['classNames']> = {
  sm: {
    base: 'px-aos-md', //TODO need talk
  },
  md: {
    base: 'px-aos-xl',
  },
  lg: {
    base: 'px-aos-2xl', //TODO need talk
  },
};

function Section({
  classNames = {},
  children,
  size = 'md',
  onClick,
}: SectionProps) {
  return (
    <Card
      shadow="none"
      onPress={onClick ?? (() => {})}
      isPressable={!!onClick}
      classNames={{
        ...classNames,
        header: twMerge(
          'flex-row items-center px-0 text-aos-co-primary text-lg font-bold justify-between',
          sizeClassNames[size]?.header,
          classNames?.header,
        ),
        body: twMerge(
          'px-0 gap-3 static overflow-visible',
          sizeClassNames[size]?.body,
          classNames?.body,
        ),
        base: twMerge(
          'w-full px-aos-xl py-aos-xl overflow-visible',
          sizeClassNames[size]?.base,
          classNames.base,
        ),
      }}
    >
      {children}
    </Card>
  );
}

Section.Header = CardHeader;
Section.Body = CardBody;

export default Section;
