# uniFlow — Smart Timetable Generator

An intelligent timetable scheduling system built with Next.js that automatically generates conflict-free academic timetables for university departments and student groups.

The system uses scheduling algorithms and constraint-based logic to allocate courses, lecturers, venues, and time slots while preventing clashes across groups, lecturers, and classrooms.

## Features

- Generate automated university timetables
- Prevent lecturer scheduling conflicts
- Prevent venue/time clashes
- Department and group-based scheduling
- Dynamic course allocation
- Structured weekly timetable generation
- Responsive and clean interface
- Local persistence for generated schedules

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React State / Local Storage

## Scheduling Logic

The timetable engine intelligently:

- assigns available time slots
- allocates free venues
- validates lecturer availability
- avoids overlapping schedules
- generates optimized weekly class structures

## Project Structure

Key folders and files:

```
src/
├── app/                # Next.js app routes and pages
├── components/         # UI components (forms, timetable views)
├── lib/                # Algorithm and storage utilities
│   ├── algorithm/
│   └── storage/
├── constants/          # Days, timeslots, venues
├── types/              # TypeScript types
└── hooks/              # Reusable hooks & mock data
```

## Getting Started

Prerequisites: Node.js (16+), npm or pnpm.

Install dependencies:

```bash
npm install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open http://localhost:3000 in your browser.

## Mock Data

The repo includes mock data used during development:

- `src/hooks/mockCourses.ts` — sample course list
- `src/data/mockTimetable.ts` — sample timetable entries

## Scheduling Engine (Overview)

The core scheduling flow (simplified):

1. Collect courses, lecturers, groups, and constraints
2. Find available timeslots and venues
3. Assign courses to slots while checking conflicts
4. Persist generated timetables to local storage

Algorithm modules are in `src/lib/algorithm` and storage helpers in `src/lib/storage`.

## Inspiration

Built to simplify timetable management in academic institutions and explore real-world scheduling algorithms, resource allocation, and constraint-solving systems.

## Future Improvements

- AI-assisted timetable optimization
- PostgreSQL integration
- Export to PDF
- Lecturer dashboard
- Multi-department scheduling
- Admin authentication
- Drag-and-drop timetable editor

## Contributing

Contributions are welcome. Open an issue or submit a pull request with a clear description of the change.

## License

This project is currently unlicensed. Add a license if you intend to publish or share the code.
