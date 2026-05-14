"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { CourseInput } from "@/types";

type CourseFormProps = {
  department: string;
  group: string;
  onSubmit: (courses: CourseInput[]) => void;
};

export default function CourseForm({
  department,
  group,
  onSubmit,
}: CourseFormProps) {
  const [rowCount, setRowCount] = useState(5);

  const rows = useMemo(
    () => Array.from({ length: rowCount }, (_, index) => index + 1),
    [rowCount],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const courses: CourseInput[] = rows
      .map((row) => {
        const code = String(formData.get(`code-${row}`) ?? "").trim();
        const title = String(formData.get(`title-${row}`) ?? "").trim();
        const lecturer = String(formData.get(`lecturer-${row}`) ?? "").trim();
        const duration = Number(formData.get(`duration-${row}`) ?? 0);

        if (!code || !title || !lecturer || !duration) {
          return null;
        }

        return {
          code,
          title,
          lecturer,
          duration,
        };
      })
      .filter((course): course is CourseInput => course !== null);

    onSubmit(courses);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        Input for {department} Group {group}
      </h2>

      <div>
        <label htmlFor="rowCount">Choose number of rows</label>
        <select
          id="rowCount"
          name="rowCount"
          value={rowCount}
          onChange={(event) => setRowCount(Number(event.target.value))}
        >
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Course code</th>
            <th>Lecturer</th>
            <th>Course title</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td>
                <input type="text" name={`code-${row}`} required />
              </td>
              <td>
                <input type="text" name={`lecturer-${row}`} required />
              </td>
              <td>
                <input type="text" name={`title-${row}`} required />
              </td>
              <td>
                <input
                  type="number"
                  name={`duration-${row}`}
                  min={1}
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="submit">Generate Timetable</button>
    </form>
  );
}
