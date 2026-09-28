import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { BackButton } from '@/components/ui/BackButton';

export const MotionLink = motion.create(Link);
export const MotionBackButton = motion.create(BackButton);
