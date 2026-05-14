import { SavedTimetable } from "../../types";

export async function saveTimetable(timetable: SavedTimetable) {
  // Placeholder: store in localStorage if available
  const existing =
    typeof window !== "undefined" ? localStorage.getItem("timetables") : null;

  const timetables: SavedTimetable[] = existing ? JSON.parse(existing) : [];

  timetables.push(timetable);

  localStorage.setItem("timetables", JSON.stringify(timetables));
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("timetables", JSON.stringify(entries));
  //   }
}

export default saveTimetable;
