import { useState } from "react";
import clsx from "clsx";

import styles from "./UI.module.css";

type Status = "available" | "networking" | "freelance" | "employed";

type StatusMap = {
  label: string;
  color: string;
};

const statusMap: Record<Status, StatusMap> = {
  available: {
    label: "Available for Work",
    color: "bg-green-500",
  },
  networking: {
    label: "Open to Connecting",
    color: "bg-blue-500",
  },
  freelance: {
    label: "Open for Freelance Work",
    color: "bg-yellow-500",
  },
  employed: {
    label: "Currently Employed, Open to Connecting",
    color: "bg-amber-500",
  },
};

export function StatusBadge() {
  const [status] = useState<Status>("available");

  const currentStatus = statusMap[status];

  return (
    <div className={clsx(styles.statusBadge, "subtext-mono")}>
      <span
        className={clsx("w-3", "h-3", "rounded-full", currentStatus.color)}
      ></span>
      <span>{currentStatus.label}</span>
    </div>
  );
}
