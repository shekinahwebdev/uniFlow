import { VENUES } from "@/constants/venues";
import { TimetableEntry } from "../../types";

export function assignVenue(
  entry: TimetableEntry,
  existing: TimetableEntry[],
): TimetableEntry {
  const usedVenues = new Set(
    existing
      .filter((e) => e.day === entry.day && e.timeslot === entry.timeslot)
      .map((e) => e.venue),
  );

  const availableVenues = VENUES.filter((v) => !usedVenues.has(v));

  if (availableVenues.length === 0) {
    throw new Error("No available venue for this slot");
  }

  const selectedVenue =
    availableVenues[Math.floor(Math.random() * availableVenues.length)];

  return {
    ...entry,
    venue: selectedVenue,
  };
}

export default assignVenue;
