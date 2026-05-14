import { DAYS } from "../constants/days";
import { TIMESLOTS } from "../constants/timeslots";
import { VENUES } from "../constants/venues";
import { mockCourses } from "../hooks/mockCourses";

export const mockTimetables = [
  {
    day: DAYS[0],
    timeslot: TIMESLOTS[0],
    venue: VENUES[0],
    course: mockCourses[0],
  },
  {
    day: DAYS[0],
    timeslot: TIMESLOTS[1],
    venue: VENUES[1],
    course: mockCourses[1],
  },
  {
    day: DAYS[1],
    timeslot: TIMESLOTS[0],
    venue: VENUES[2],
    course: mockCourses[2],
  },
  {
    day: DAYS[2],
    timeslot: TIMESLOTS[2],
    venue: VENUES[3],
    course: mockCourses[3],
  },
];
