import { type ComponentPropsWithRef } from 'react';

import clsx from 'clsx';

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={clsx(
        'embla__button',
        'embla__button--prev',
        disabled && 'embla__button--disabled'
      )}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
};

export const NextButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={clsx(
        'embla__button',
        'embla__button--next',
        disabled && 'embla__button--disabled'
      )}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
};
