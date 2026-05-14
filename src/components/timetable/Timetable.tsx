"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TimetableGrid from "@/components/timetable/TimetableGrid";
import { DAYS } from "@/constants/days";
import { TIMESLOTS } from "@/constants/timeslots";
import { getTimetable } from "@/lib/storage/timetables";
import type { TimetableEntry } from "@/types";

const DISPLAY_TIMES = [
  "7:00am - 9:00am",
  "9:00am - 11:00am",
  "11:00am - 13:00pm",
  "13:00pm - 15:00pm",
  "15:00pm - 17:00pm",
];

export default function Timetable() {
  const routeSearchParams = useSearchParams();
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const queryDepartment =
    routeSearchParams.get("department") ?? "Computer Science";
  const queryGroup = routeSearchParams.get("group") ?? "A";
  const isSaved = routeSearchParams.get("saved") === "true";

  useEffect(() => {
    async function loadTimetable() {
      if (isSaved) {
        const savedTimetable = await getTimetable(queryDepartment, queryGroup);
        if (savedTimetable) {
          setEntries(savedTimetable.entries);
        }
      } else {
        const tempTimetableRaw = sessionStorage.getItem("temp_timetable");
        if (tempTimetableRaw) {
          setEntries(JSON.parse(tempTimetableRaw));
          sessionStorage.removeItem("temp_timetable"); // Clean up
        }
      }
      setIsLoading(false);
    }

    void loadTimetable();
  }, [queryDepartment, queryGroup, isSaved]);

  return (
    <>
      <h1>
        {queryDepartment} Group {queryGroup} Timetable
      </h1>
      {/* <Link href="/generate">Go to Generate Page</Link> */}
      <Link href="/saved">View All Saved Timetables</Link>
      {isLoading ? (
        <p>Loading timetable...</p>
      ) : entries.length > 0 ? (
        <TimetableGrid
          entries={entries}
          days={DAYS}
          timeslots={TIMESLOTS}
          displayTimes={DISPLAY_TIMES}
        />
      ) : (
        <p>No timetable generated yet. Go back and submit the course form.</p>
      )}
    </>
  );
}
