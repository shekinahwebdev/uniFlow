import { AvailableSlot } from "@/types";

export function getAvailableSlots(slots: AvailableSlot[]) {
  const result: string[] = [];

  for (const slot of slots) {
    result.push(`${slot.day} ${slot.timeslot}`);
  }

  return result;
}

export default getAvailableSlots;
