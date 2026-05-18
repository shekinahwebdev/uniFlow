"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { deleteTimetable, getTimetables } from "@/lib/storage/timetables";
import { SavedTimetable } from "@/types";

export default function SavedTimetablesPage() {
	const [savedTimetables, setSavedTimetables] = useState<SavedTimetable[]>(
		[],
	);
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
			<main style={{ maxWidth: "800px", margin: "0 auto" }}>
				<h1>Loading saved timetables...</h1>
			</main>
		);
	}

	return (
		<main style={{ maxWidth: "800px", margin: "0 auto" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "var(--spacing-xl)",
					paddingBottom: "var(--spacing-lg)",
					borderBottom: "1px solid var(--color-border)",
				}}
			>
				<h1 style={{ marginBottom: 0 }}>Saved Timetables</h1>
				<Link href="/" style={{ fontSize: "0.95rem" }}>
					← Home
				</Link>
			</div>

			{savedTimetables.length === 0 ? (
				<div
					style={{
						padding: "var(--spacing-xl)",
						backgroundColor: "var(--color-surface)",
						borderRadius: "var(--border-radius-lg)",
						textAlign: "center",
						color: "var(--color-text-secondary)",
					}}
				>
					<p style={{ marginBottom: "var(--spacing-md)" }}>
						No timetables have been saved yet.
					</p>
					<Link href="/">Create your first timetable →</Link>
				</div>
			) : (
				<div style={{ display: "grid", gap: "var(--spacing-md)" }}>
					{savedTimetables
						.filter((t) => t.department && t.group)
						.map(({ department, group }) => (
							<div
								key={`${department}-${group}`}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "var(--spacing-lg)",
									border: "1px solid var(--color-border)",
									borderRadius: "var(--border-radius-lg)",
									backgroundColor: "var(--color-surface)",
									transition: "all var(--transition-fast)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor =
										"rgba(0, 102, 204, 0.05)";
									e.currentTarget.style.borderColor =
										"var(--color-accent)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor =
										"var(--color-surface)";
									e.currentTarget.style.borderColor =
										"var(--color-border)";
								}}
							>
								<div>
									<h2
										style={{
											marginBottom: "var(--spacing-xs)",
										}}
									>
										{department}
									</h2>
									<p
										style={{
											color: "var(--color-text-secondary)",
											fontSize: "0.95rem",
										}}
									>
										Group {group}
									</p>
								</div>
								<div
									style={{
										display: "flex",
										gap: "var(--spacing-md)",
									}}
								>
									<Link
										href={`/timetable?department=${encodeURIComponent(department)}&group=${group}&saved=true`}
										style={{
											padding:
												"var(--spacing-sm) var(--spacing-md)",
											backgroundColor:
												"var(--color-accent)",
											color: "white",
											borderRadius:
												"var(--border-radius-md)",
											fontSize: "0.95rem",
											fontWeight: 500,
											transition:
												"all var(--transition-fast)",
											display: "inline-block",
										}}
									>
										View
									</Link>
									<button
										onClick={() =>
											handleDelete(department, group)
										}
										style={{
											padding:
												"var(--spacing-sm) var(--spacing-md)",
											backgroundColor:
												"var(--color-surface)",
											color: "var(--color-text-primary)",
											border: "1px solid var(--color-border)",
											borderRadius:
												"var(--border-radius-md)",
											fontSize: "0.95rem",
											fontWeight: 500,
											cursor: "pointer",
											transition:
												"all var(--transition-fast)",
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.borderColor =
												"var(--color-error)";
											e.currentTarget.style.color =
												"var(--color-error)";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.borderColor =
												"var(--color-border)";
											e.currentTarget.style.color =
												"var(--color-text-primary)";
										}}
									>
										Delete
									</button>
								</div>
							</div>
						))}
				</div>
			)}
		</main>
	);
}
