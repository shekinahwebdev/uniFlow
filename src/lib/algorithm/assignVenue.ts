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

  const availableVenue = VENUES.find((v) => !usedVenues.has(v));

  if (!availableVenue) {
    throw new Error("No available venue for this slot");
  }

  return {
    ...entry,
    venue: availableVenue,
  };
}

export default assignVenue;
