import clsx from 'clsx';
import { type HTMLMotionProps, motion } from 'framer-motion';

import styles from './UI.module.css';

type Status = 'available' | 'networking' | 'freelance' | 'employed';

const statusMap: Record<Status, { label: string; color: string }> = {
  available: {
    label: 'Available for Work',
    color: 'bg-green-500',
  },
  networking: {
    label: 'Open to Connecting',
    color: 'bg-blue-500',
  },
  freelance: {
    label: 'Open for Freelance Work',
    color: 'bg-yellow-500',
  },
  employed: {
    label: 'Currently Employed, Open to Connecting',
    color: 'bg-amber-500',
  },
};

type StatusBadgeProps = HTMLMotionProps<'div'> & {
  /**
   * Career Status Options: "available", "networking", "freelance", "employed".
   */
  currentStatus: Status;
  className?: string;
};

export function StatusBadge({
  currentStatus,
  className,
  ...motionProps
}: StatusBadgeProps) {
  const { label, color } = statusMap[currentStatus];

  return (
    <motion.div
      {...motionProps}
      className={clsx(styles.statusBadge, 'subtext-mono', className)}
    >
      <span className={clsx('size-3 rounded-full', color)} />
      <span>{label}</span>
    </motion.div>
  );
}
