import { motion } from 'framer-motion';

import { useAppLayoutRefs } from '@/hooks/useAppLayoutRefs';
import { fadeVariants } from '@/motion';

export const FOOTER_HEIGHT_REM: number = 4;

export function Footer() {
  const { footerRef } = useAppLayoutRefs();
  return (
    <motion.footer
      ref={footerRef}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="footer flex items-center justify-between w-full h-frame max-w-page z-50"
    >
      <span>(c) 2026</span>
      <span>Helen Park</span>
      <span>es.helenpark@gmail.com</span>
    </motion.footer>
  );
}
