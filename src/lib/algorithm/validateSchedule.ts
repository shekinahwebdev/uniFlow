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

      const lectureConflict = a.course.lecturer === b.course.lecturer;
      const venueConflict = a.venue === b.venue;
      const groupConflict = a.course.group === b.course.group;

      if (lectureConflict || venueConflict || groupConflict) {
        return false;
      }
    }
  }

  return true;
}

export default validateSchedule;
