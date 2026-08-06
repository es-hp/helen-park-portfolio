import { Fragment } from 'react';

import { Dot } from 'lucide-react';
import StackIcon from 'tech-stack-icons';

import { type TechStack } from '@/types/types';
import { useElementWidth } from '@/utils/utils';

interface StackIconsProps {
  techStackItems: TechStack[];
}

const ICON_SIZE_PX = 32;

export function StackIcons({ techStackItems }: StackIconsProps) {
  const { ref, width: containerWidth } = useElementWidth<HTMLDivElement>();

  const stackLength = techStackItems.length;

  const getCols = (): number => {
    const maxCols = stackLength * 2 - 1;
    const cols =
      maxCols * ICON_SIZE_PX <= containerWidth
        ? maxCols
        : Math.floor(containerWidth / ICON_SIZE_PX) % 2 !== 0
          ? Math.floor(containerWidth / ICON_SIZE_PX)
          : Math.floor(containerWidth / ICON_SIZE_PX) - 1;
    return cols;
  };

  const cols = getCols();

  return (
    <div
      ref={ref}
      className="grid place-items-center justify-center gap-y-4 min-w-0 w-full"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${ICON_SIZE_PX}px)`,
      }}
    >
      {techStackItems.map((item, index) => (
        <Fragment key={index}>
          <StackIcon
            name={item.icon}
            style={{ width: ICON_SIZE_PX, height: ICON_SIZE_PX }}
          />
          {index !== stackLength - 1 && (
            <Dot
              size={ICON_SIZE_PX}
              aria-hidden="true"
              className={`stack-divider divider-${index}`}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
