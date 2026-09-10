type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  /**
   * Controls the diameter and stroke width of the spinner.
   * sm = 16px, md = 24px (default), lg = 40px
   */
  size?: SpinnerSize;
  /**
   * Tailwind text color class controlling the spinner's color,
   * e.g. "text-blue-600". Defaults to the current text color.
   */
  className?: string;
  /**
   * Accessible label read by screen readers. Defaults to "Loading".
   */
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-4',
};

/**
 * Customizable loading spinner.
 *
 * @param {SpinnerProps} props
 * @param {"sm" | "md" | "lg"} [props.size="md"]
 * @param {string} [props.className=""]
 * @param {string} [props.label="Loading"]
 */
export function Spinner({
  size = 'md',
  className = '',
  label = 'Loading',
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center justify-center"
    >
      <span
        className={[
          'animate-spin rounded-full border-current border-t-transparent',
          sizeClasses[size],
          className,
        ].join(' ')}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
