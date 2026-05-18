"use client";

import type { CourseInput } from "@/types";
import { useState, type FormEvent } from "react";
import styles from "./forms.module.css";

type CourseFormProps = {
	department: string;
	group: string;
	onSubmit: (courses: CourseInput[]) => void;
};

type CourseRow = {
	id: string;
	code: string;
	lecturer: string;
	title: string;
	duration: string;
};

export default function CourseForm({
	department,
	group,
	onSubmit,
}: CourseFormProps) {
	const [courses, setCourses] = useState<CourseRow[]>([
		{ id: "1", code: "", lecturer: "", title: "", duration: "" },
		{ id: "2", code: "", lecturer: "", title: "", duration: "" },
		{ id: "3", code: "", lecturer: "", title: "", duration: "" },
	]);

	function handleAddCourse() {
		const newId = String(
			Math.max(...courses.map((c) => Number(c.id) || 0)) + 1,
		);
		setCourses([
			...courses,
			{ id: newId, code: "", lecturer: "", title: "", duration: "" },
		]);
	}

	function handleRemoveCourse(id: string) {
		if (courses.length > 1) {
			setCourses(courses.filter((c) => c.id !== id));
		}
	}

	function handleCourseChange(
		id: string,
		field: keyof CourseRow,
		value: string,
	) {
		setCourses(
			courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
		);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const validCourses: CourseInput[] = courses
			.map((row) => {
				const code = row.code.trim();
				const title = row.title.trim();
				const lecturer = row.lecturer.trim();
				const duration = Number(row.duration);

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

		if (validCourses.length === 0) {
			alert("Please fill in at least one course");
			return;
		}

		onSubmit(validCourses);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div>
				<h2>
					Input for {department} Group {group}
				</h2>
				<p
					style={{
						color: "var(--color-text-secondary)",
						marginTop: "var(--spacing-sm)",
					}}
				>
					Add the courses you want to schedule
				</p>
			</div>

			<div className={styles.coursesList}>
				{courses.map((course, index) => (
					<div key={course.id} className={styles.courseRow}>
						<div className={styles.courseIndex}>{index + 1}</div>
						<div className={styles.courseInputs}>
							<div className={styles.inputGroup}>
								<label>Course Code</label>
								<input
									type="text"
									placeholder="e.g., CS101"
									value={course.code}
									onChange={(e) =>
										handleCourseChange(
											course.id,
											"code",
											e.target.value,
										)
									}
								/>
							</div>
							<div className={styles.inputGroup}>
								<label>Lecturer</label>
								<input
									type="text"
									placeholder="Lecturer name"
									value={course.lecturer}
									onChange={(e) =>
										handleCourseChange(
											course.id,
											"lecturer",
											e.target.value,
										)
									}
								/>
							</div>
							<div className={styles.inputGroup}>
								<label>Course Title</label>
								<input
									type="text"
									placeholder="Course title"
									value={course.title}
									onChange={(e) =>
										handleCourseChange(
											course.id,
											"title",
											e.target.value,
										)
									}
								/>
							</div>
							<div className={styles.inputGroup}>
								<label>Duration (hours)</label>
								<input
									type="number"
									placeholder="2"
									min="1"
									max="8"
									value={course.duration}
									onChange={(e) =>
										handleCourseChange(
											course.id,
											"duration",
											e.target.value,
										)
									}
								/>
							</div>
						</div>
						{courses.length > 1 && (
							<button
								type="button"
								className={styles.removeButton}
								onClick={() => handleRemoveCourse(course.id)}
								title="Remove course"
							>
								✕
							</button>
						)}
					</div>
				))}
			</div>

			<div className={styles.buttonGroup}>
				<button
					type="button"
					className={styles.addButton}
					onClick={handleAddCourse}
				>
					+ Add Course
				</button>
				<button
					type="submit"
					className={styles.button}
					disabled={courses.every(
						(c) =>
							!c.code && !c.title && !c.lecturer && !c.duration,
					)}
				>
					Generate Timetable
				</button>
			</div>
		</form>
	);
}
