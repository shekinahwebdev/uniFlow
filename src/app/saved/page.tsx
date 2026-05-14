"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { SavedTimetable } from "@/types";
import { deleteTimetable, getTimetables } from "@/lib/storage/timetables";

export default function SavedTimetablesPage() {
  const [savedTimetables, setSavedTimetables] = useState<SavedTimetable[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadTimetables() {
    const timetables = await getTimetables();
    setSavedTimetables(timetables);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTimetables();
  }, []);

  async function handleDelete(department: string, group: string) {
    await deleteTimetable(department, group);
    await loadTimetables(); // Refresh the list
  }

  if (isLoading) {
    return (
      <main>
        <h1>Loading saved timetables...</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Saved Timetables</h1>
      {savedTimetables.length === 0 ? (
        <p>No timetables have been saved yet.</p>
      ) : (
        <div>
          {savedTimetables
            .filter((t) => t.department && t.group)
            .map(({ department, group }) => (
              <div
                key={`${department}-${group}`}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <h2>
                  {department} - Group {group}
                </h2>
                <Link
                  href={`/timetable?department=${encodeURIComponent(department)}&group=${group}&saved=true`}
                >
                  View Timetable
                </Link>
                <button onClick={() => handleDelete(department, group)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      )}
      <Link href="/">Back to Home</Link>
    </main>
  );
}
