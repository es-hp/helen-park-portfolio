import { Link } from 'react-router-dom';

import { BackButton } from '@/components/ui/BackButton';
import { useAppLayoutRefs } from '@/hooks/useAppLayoutRefs';

import styles from './ProjectComponents.module.css';

export function ProjectGalleryHeader() {
  const { headerRef } = useAppLayoutRefs();
  return (
    <header ref={headerRef} className={styles.carouselHeader}>
      <BackButton />
      <Link to="/Projects">
        <h1>Projects</h1>
      </Link>
      <Link to="/Resume" className="hover:shadow-[inset_0_-1px_0_currentColor]">
        Resume
      </Link>
    </header>
  );
}
