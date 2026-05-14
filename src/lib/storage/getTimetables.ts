import { TimetableEntry } from "../../types";

export async function getTimetables(): Promise<TimetableEntry[]> {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("timetables");
    return raw ? JSON.parse(raw) : [];
  }
  return [];
}

export default getTimetables;
