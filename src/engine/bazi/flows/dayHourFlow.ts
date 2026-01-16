import { Pillar } from "../../shared/types";
import { computeDayPillar } from "../calendar/dayPillar";
import { computeHourPillar } from "../calendar/hourPillar";

/**
 * Day & Hour flows are continuous JiaZi cycles.
 */
export function computeDayHourFlow(
  normalizedISO: string,
  dayStem: Pillar["stem"]
): { day: Pillar; hour: Pillar } {
  const day = computeDayPillar(normalizedISO);
  const date = new Date(normalizedISO);
  const hour = computeHourPillar(dayStem, date.getHours());
  return { day, hour };
}
