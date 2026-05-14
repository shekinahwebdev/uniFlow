import { TimetableEntry } from "@/types";
import { DAYS } from "@/constants/days";
import { TIMESLOTS } from "@/constants/timeslots";
import checkConflicts from "./checkConflicts";
import assignVenue from "./assignVenue";
import validateSchedule from "./validateSchedule";

export function generateTimetable(entries: TimetableEntry[]): TimetableEntry[] {
  const timetable: TimetableEntry[] = [];
  const spreadSlots = buildRandomSpreadSlots(entries.length);

  for (const [index, entry] of entries.entries()) {
    const scheduledEntry: TimetableEntry = {
      ...entry,
      day: spreadSlots[index].day,
      timeslot: spreadSlots[index].timeslot,
    };

    let scheduled: TimetableEntry;

    try {
      scheduled = assignVenue(scheduledEntry, timetable);
    } catch {
      continue; // no venue available
    }

    const hasConflict = checkConflicts(scheduled, timetable);

    if (hasConflict) continue;

    timetable.push(scheduled);
  }

  validateSchedule(timetable);

  return timetable;
}

export default generateTimetable;

function buildRandomSpreadSlots(count: number) {
  const slots = DAYS.flatMap((day) =>
    TIMESLOTS.map((timeslot) => ({ day, timeslot })),
  );

  const shuffledSlots = shuffle(slots);

  return shuffledSlots.slice(0, count);
}

function shuffle<T>(items: T[]) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}
