import { TimetableEntry } from "@/types";

export function validateSchedule(entries: TimetableEntry[]): boolean {
  for (let i = 0; i < entries.length; i++) {
    const a = entries[i];

    if (!a.course || !a.day || !a.timeslot || !a.venue) {
      return false; // incomplete entry
    }

    for (let j = i + 1; j < entries.length; j++) {
      const b = entries[j];

      const sameSlot = a.day === b.day && a.timeslot === b.timeslot;

      if (!sameSlot) continue;

      // lecturer clash
      if (a.course.lecturer === b.course.lecturer) {
        return false;
      }

      // group clash
      if (a.course.group === b.course.group) {
        return false;
      }

      // venue clash
      if (a.venue === b.venue) {
        return false;
      }
    }
  }

  return true;
}

export default validateSchedule;
