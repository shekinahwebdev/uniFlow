import { TimetableEntry } from "../../types";

export async function saveTimetable(entries: TimetableEntry[]) {
  // Placeholder: store in localStorage if available
  if (typeof window !== "undefined") {
    localStorage.setItem("timetables", JSON.stringify(entries));
  }
}

export default saveTimetable;
