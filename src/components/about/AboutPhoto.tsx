import styles from "./About.module.css";

export function AboutPhoto() {
  return (
    <img
      src="/images/2026_profile-photo_Helen.webp"
      alt="About Photo"
      className={styles.aboutPhoto}
      data-pin-nopin="true"
    />
  );
}
