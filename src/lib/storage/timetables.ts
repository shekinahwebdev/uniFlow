import { TimetableEntry, SavedTimetable } from "../../types";

const TIMETABLES_KEY = "timetables";

export async function saveTimetable(
  department: string,
  group: string,
  entries: TimetableEntry[],
): Promise<void> {
  if (typeof window !== "undefined") {
    const existingTimetables = await getTimetables();
    const newTimetable: SavedTimetable = { department, group, entries };

    // Remove any existing timetable with the same department and group
    const updatedTimetables = existingTimetables.filter(
      (t) => !(t.department === department && t.group === group),
    );

    updatedTimetables.push(newTimetable);
    localStorage.setItem(TIMETABLES_KEY, JSON.stringify(updatedTimetables));
  }
}

export async function getTimetables(): Promise<SavedTimetable[]> {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(TIMETABLES_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  return [];
}

export async function getTimetable(
  department: string,
  group: string,
): Promise<SavedTimetable | null> {
  if (typeof window !== "undefined") {
    const timetables = await getTimetables();
    return (
      timetables.find(
        (t) => t.department === department && t.group === group,
      ) || null
    );
  }
  return null;
}

export async function deleteTimetable(
  department: string,
  group: string,
): Promise<void> {
  if (typeof window !== "undefined") {
    let timetables = await getTimetables();
    timetables = timetables.filter(
      (t) => !(t.department === department && t.group === group),
    );
    localStorage.setItem(TIMETABLES_KEY, JSON.stringify(timetables));
  }
}

export async function clearTimetables(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TIMETABLES_KEY);
  }
}
