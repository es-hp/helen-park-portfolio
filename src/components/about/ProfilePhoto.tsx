import styles from "./About.module.css";

export function ProfilePhoto() {
  return (
    <img
      src="/images/2026_profile-photo_Helen.webp"
      alt="Profile"
      className={styles.profilePhoto}
    />
  );
}
