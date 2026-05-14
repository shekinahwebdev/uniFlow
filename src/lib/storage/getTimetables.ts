import { SavedTimetable, TimetableEntry } from "../../types";

export async function getTimetables(): Promise<SavedTimetable[]> {
  if (typeof window !== "undefined") {
    // const raw = localStorage.getItem("timetables");
    // return raw ? JSON.parse(raw) : [];
    return [];
  }
  const data = localStorage.getItem("timetables");
  return data ? JSON.parse(data) : [];

  //   return [];
}

export default getTimetables;
