"use client";
import styles from "./page.module.css";

const departments = [
	"Computer Science",
	"IT",
	"Software Engineering",
	"Data Science",
];

export default function Page() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h1>UniFlow</h1>
					<p>
						Generate optimized university timetables with conflict
						detection and venue management.
					</p>
				</div>

				<div className={styles.ctas}>
					{departments.map((dept) => (
						<a
							key={dept}
							href={`/generate?department=${encodeURIComponent(dept)}`}
							className={styles.ctaButton}
						>
							{dept}
						</a>
					))}
				</div>

				<p className={styles.subtitle}>
					Select a department to create a new timetable
				</p>
			</main>
		</div>
	);
}
