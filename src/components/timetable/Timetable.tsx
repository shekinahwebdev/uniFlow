"use client";

import TimetableGrid from "@/components/timetable/TimetableGrid";
import { DAYS } from "@/constants/days";
import { TIMESLOTS } from "@/constants/timeslots";
import { getTimetable } from "@/lib/storage/timetables";
import type { TimetableEntry } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
				const savedTimetable = await getTimetable(
					queryDepartment,
					queryGroup,
				);
				if (savedTimetable) {
					setEntries(savedTimetable.entries);
				}
			} else {
				const tempTimetableRaw =
					sessionStorage.getItem("temp_timetable");
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
		<div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "var(--spacing-xl)",
					paddingBottom: "var(--spacing-lg)",
					borderBottom: "1px solid var(--color-border)",
					flexWrap: "wrap",
					gap: "var(--spacing-md)",
				}}
			>
				<h1 style={{ marginBottom: 0 }}>
					{queryDepartment} Group {queryGroup}
				</h1>
				<div style={{ display: "flex", gap: "var(--spacing-md)" }}>
					<Link href="/saved" style={{ fontSize: "0.95rem" }}>
						All Timetables →
					</Link>
					<Link href="/" style={{ fontSize: "0.95rem" }}>
						← Home
					</Link>
				</div>
			</div>

			{isLoading ? (
				<div
					style={{
						padding: "var(--spacing-xl)",
						textAlign: "center",
						color: "var(--color-text-secondary)",
					}}
				>
					<p>Loading timetable...</p>
				</div>
			) : entries.length > 0 ? (
				<TimetableGrid
					entries={entries}
					days={DAYS}
					timeslots={TIMESLOTS}
					displayTimes={DISPLAY_TIMES}
				/>
			) : (
				<div
					style={{
						padding: "var(--spacing-xl)",
						backgroundColor: "var(--color-surface)",
						borderRadius: "var(--border-radius-lg)",
						textAlign: "center",
						color: "var(--color-text-secondary)",
					}}
				>
					<p>
						No timetable generated yet. Go back and submit the
						course form.
					</p>
					<Link
						href={`/generate?department=${encodeURIComponent(queryDepartment)}`}
						style={{
							marginTop: "var(--spacing-md)",
							display: "inline-block",
						}}
					>
						→ Generate Timetable
					</Link>
				</div>
			)}
		</div>
	);
}
