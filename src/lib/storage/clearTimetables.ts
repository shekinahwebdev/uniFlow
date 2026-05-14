export async function clearTimetables() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("timetables");
  }
}

export default clearTimetables;
