"use client";

import { Suspense } from "react";
import Timetable from "@/components/timetable/Timetable";

export default function TimetablePage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Timetable />
      </Suspense>
    </main>
  );
}
