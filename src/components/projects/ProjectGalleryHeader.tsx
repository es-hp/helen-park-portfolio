import { Link } from 'react-router-dom';

import { BackButton } from '@/components/ui/BackButton';
import { useAppLayoutRefs } from '@/hooks/useAppLayoutRefs';

import styles from './ProjectComponents.module.css';

export function ProjectGalleryHeader() {
  const { headerRef } = useAppLayoutRefs();
  return (
    <header ref={headerRef} className={styles.carouselHeader}>
      <BackButton />
      <h1>Projects</h1>
      <Link to="/Resume">Resume</Link>
    </header>
  );
}
