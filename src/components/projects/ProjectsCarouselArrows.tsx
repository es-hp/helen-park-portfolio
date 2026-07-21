import { NextButton, PrevButton } from '../carousel/CarouselArrowButtons';

type ProjectBtnProps = {
  onClick: () => void;
  disabled: boolean;
};

export const PrevProjectBtn = ({ onClick, disabled }: ProjectBtnProps) => {
  return (
    <PrevButton onClick={onClick} disabled={disabled}>
      {'<'}
    </PrevButton>
  );
};

export const NextProjectBtn = ({ onClick, disabled }: ProjectBtnProps) => {
  return (
    <NextButton onClick={onClick} disabled={disabled}>
      {'>'}
    </NextButton>
  );
};
