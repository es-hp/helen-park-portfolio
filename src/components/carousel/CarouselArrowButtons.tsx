import { type ComponentPropsWithRef } from 'react';

import clsx from 'clsx';

type ButtonProps = ComponentPropsWithRef<'button'>;

export const PrevButton = (props: ButtonProps) => {
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

export const NextButton = (props: ButtonProps) => {
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
