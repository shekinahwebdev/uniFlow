export interface Course {
  id: number;
  code: string;
  title: string;
  lecturer: string;
  duration: number;
  group: string;
}

export interface TimetableEntry {
  day: string;
  timeslot: string;
  venue: string;
  course: Course;
}

export type Day = string;
export type Timeslot = string;
export type Venue = string;

export default {};
