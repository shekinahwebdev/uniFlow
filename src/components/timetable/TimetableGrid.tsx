import type { TimetableEntry } from "@/types";
import TimetableCard from "./TimetableCard";
import styles from "./timetable.module.css";

type TimetableGridProps = {
  entries: TimetableEntry[];
  days: string[];
  timeslots: string[];
  displayTimes: string[];
};

export default function TimetableGrid({
  entries,
  days,
  timeslots,
  displayTimes,
}: TimetableGridProps) {
  return (
    <section className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.topHeader}>DAY</th>
            <th className={styles.topHeader} colSpan={timeslots.length}>
              TIME
            </th>
          </tr>
          <tr>
            <th />
            {displayTimes.map((time) => (
              <th key={time} className={styles.timeLabel}>
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <th scope="row" className={`${styles.dayHeader} ${getDayClass(day)}`}>
                {day.slice(0, 3).toUpperCase()}
              </th>
              {timeslots.map((timeslot) => {
                const cellEntries = entries.filter(
                  (entry) => entry.day === day && entry.timeslot === timeslot,
                );

                return (
                  <td key={`${day}-${timeslot}`} className={styles.cell}>
                    {cellEntries.length > 0 ? (
                      cellEntries.map((entry) => (
                        <TimetableCard key={`${entry.course.id}-${day}-${timeslot}`} entry={entry} />
                      ))
                    ) : (
                      <div className={styles.emptyCell} aria-hidden="true" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function getDayClass(day: string) {
  switch (day) {
    case "Monday":
      return styles.dayMon;
    case "Tuesday":
      return styles.dayTue;
    case "Wednesday":
      return styles.dayWed;
    case "Thursday":
      return styles.dayThu;
    case "Friday":
      return styles.dayFri;
    default:
      return "";
  }
}
