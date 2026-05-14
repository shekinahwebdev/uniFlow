// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import CourseForm from "@/components/forms/CourseForm";
// import { saveTimetable } from "@/lib/storage/timetables";
// import generateTimetable from "@/lib/algorithm/generateTimetable";
// import type { CourseInput, TimetableEntry } from "@/types";

// export default function GenerateForm() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const department = searchParams.get("department") ?? "Select a department";
//   const [group, setGroup] = useState("");

//   function handleGenerate(courses: CourseInput[]) {
//     const entries: TimetableEntry[] = courses.map((course, index) => {
//       return {
//         day: "",
//         timeslot: "",
//         venue: "",
//         course: {
//           id: index + 1,
//           code: course.code,
//           title: course.title,
//           lecturer: course.lecturer,
//           duration: course.duration,
//           group,
//         },
//       };
//     });

//     const timetable = generateTimetable(entries);
//     void saveTimetable(department, group, timetable);

//     router.push(
//       `/timetable?department=${encodeURIComponent(department)}&group=${group}`,
//     );
//   }

//   return (
//     <>
//       <h1>Input for {department}</h1>

//       <div>
//         <label htmlFor="group">Select a group</label>
//         <select
//           id="group"
//           name="group"
//           value={group}
//           onChange={(event) => setGroup(event.target.value)}
//         >
//           <option value="">Choose a group</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//           <option value="C">C</option>
//           <option value="D">D</option>
//         </select>
//       </div>

//       {group ? (
//         <CourseForm
//           department={department}
//           group={group}
//           onSubmit={handleGenerate}
//         />
//       ) : null}

//       <Link href="/saved">View Saved Timetables</Link>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import CourseForm from "@/components/forms/CourseForm";

import generateTimetable from "@/lib/algorithm/generateTimetable";

import { saveTimetable, getTimetables } from "@/lib/storage/timetables";

import type { CourseInput, TimetableEntry } from "@/types";

export default function GenerateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const department = searchParams.get("department") ?? "Select a department";
  const [group, setGroup] = useState("");

  async function handleGenerate(courses: CourseInput[]) {
    const entries: TimetableEntry[] = courses.map((course, index) => {
      return {
        day: "",
        timeslot: "",
        venue: "",

        course: {
          id: index + 1,
          code: course.code,
          title: course.title,
          lecturer: course.lecturer,
          duration: course.duration,
          group,
        },
      };
    });

    const savedTimetables = await getTimetables();

    const globalEntries = savedTimetables.flatMap(
      (timetable) => timetable.entries,
    );

    const timetable = generateTimetable(entries, globalEntries);

    await saveTimetable({
      department,
      group,
      entries: timetable,
    });

    router.push(
      `/timetable?department=${encodeURIComponent(department)}&group=${group}`,
    );
  }

  return (
    <>
      <h1>Input for {department}</h1>

      <div>
        <label htmlFor="group">Select a group</label>

        <select
          id="group"
          name="group"
          value={group}
          onChange={(event) => setGroup(event.target.value)}
        >
          <option value="">Choose a group</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>

      {group ? (
        <CourseForm
          department={department}
          group={group}
          onSubmit={handleGenerate}
        />
      ) : null}

      <Link href="/saved">View Saved Timetables</Link>
    </>
  );
}
