import { TimetableEntry } from "../../types";

// export function checkConflicts(
//   newEntry: TimetableEntry,
//   existingEntries: TimetableEntry[],
// ): boolean {
//   for (const entry of existingEntries) {
//     const sameDay = entry.day === newEntry.day;
//     const sameTimeslot = entry.timeslot === newEntry.timeslot;

//     if (!sameDay || !sameTimeslot) continue;

//     const lectureConflict = entry.course.lecturer === newEntry.course.lecturer;
//     const venueConflict = entry.venue === newEntry.venue;
//     const groupConflict = entry.course.group === newEntry.course.group;

//     if (lectureConflict || venueConflict || groupConflict) {
//       return true;
//     }
//   }

//   return false;
// }

// export default checkConflicts;

export function checkConflicts(
  newEntry: TimetableEntry,

  globalEntries: TimetableEntry[],
): boolean {
  for (const entry of globalEntries) {
    const sameDay = entry.day === newEntry.day;

    const sameTimeslot = entry.timeslot === newEntry.timeslot;
    if (!sameDay || !sameTimeslot) continue;

    const lecturerConflict = entry.course.lecturer === newEntry.course.lecturer;
    const venueConflict = entry.venue === newEntry.venue;
    const groupConflict = entry.course.group === newEntry.course.group;

    if (lecturerConflict || venueConflict || groupConflict) {
      return true;
    }
  }

  return false;
}

export default checkConflicts;
