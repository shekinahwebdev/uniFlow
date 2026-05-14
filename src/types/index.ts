export interface Course {
  id: number;
  code: string;
  title: string;
  lecturer: string;
  duration: number;
  group: string;
}

export interface CourseInput {
  code: string;
  title: string;
  lecturer: string;
  duration: number;
}

export interface TimetableEntry {
  day: string;
  timeslot: string;
  venue: string;
  course: Course;
}

export interface AvailableSlot {
  day: string;
  timeslot: string;
}

export interface SavedTimetable {
  department: string;
  group: string;
  entries: TimetableEntry[];
}

export type Day = string;
export type Timeslot = string;
export type Venue = string;

export default {};
