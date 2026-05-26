// import clsx from "clsx";
import { useState } from "react";
import { Nav } from "@/components/layout/PrimaryNav/Nav";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProfilePhoto } from "@/components/about/ProfilePhoto";
import styles from "./Home.module.css";

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  return (
    <main className={styles.main}>
      <header className="flex flex-col text-center">
        <h1 className="self-center">{"{ Helen Park }"}</h1>
        <p className="h1-sub self-center border">Software Engineer</p>
      </header>
      {isAboutOpen ?? <ProfilePhoto />}
      <StatusBadge />
      <Nav isAboutOpen={isAboutOpen} />
    </main>
  );
}
