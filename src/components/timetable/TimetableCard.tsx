import type { TimetableEntry } from "@/types";
import styles from "./timetable.module.css";

type TimetableCardProps = {
  entry: TimetableEntry;
};

export default function TimetableCard({ entry }: TimetableCardProps) {
  const formattedCode = entry.course.code.replace(/([A-Za-z]+)(\d+)/, "$1 $2");

  return (
    <article className={styles.card}>
      <div className={styles.code}>{formattedCode}</div>
      <div className={styles.title}>{entry.course.title}</div>
      <div className={`${styles.meta} ${styles.venue}`}>
        Venue: {entry.venue}
      </div>
      <div className={styles.meta}>Lecturer: {entry.course.lecturer}</div>
    </article>
  );
}
