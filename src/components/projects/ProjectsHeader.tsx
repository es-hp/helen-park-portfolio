import { Link } from 'react-router-dom';

import { BackButton } from '../ui/BackButton';
import styles from './ProjectComponents.module.css';

export function ProjectsHeader() {
  return (
    <div className={styles.carouselHeader}>
      <BackButton />
      <h1>Projects</h1>
      <Link to="/Resume">Resume</Link>
    </div>
  );
}
