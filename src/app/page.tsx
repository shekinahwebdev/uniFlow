"use client";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>UniFlow</h1>
      <p>Welcome to the university timetable generator!</p>
      <div>
        <button className="">
          <Link href="/generate?department=Computer%20Science">Computer Science</Link>
        </button>
        <button className="">
          <Link href="/generate?department=IT">IT</Link>
        </button>
        <button className="">
          <Link href="/generate?department=Software%20Engineering">Software Engineering</Link>
        </button>
        <button className="">
          <Link href="/generate?department=Data%20Science">Data Science</Link>
        </button>
      </div>

      <p>Select a department to create a timetable.</p>
    </main>
  );
}
