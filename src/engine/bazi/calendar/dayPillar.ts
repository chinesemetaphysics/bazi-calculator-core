import { Pillar } from "../../shared/types";
import { SEXAGENARY_CYCLE } from "./sexagenary";

/**
 * Reference: 1984-02-02 is a 甲子 day (widely used epoch).
 * SSOT-compliant continuous cycle.
 */
const JIA_ZI_EPOCH = new Date("1984-02-02T00:00:00Z");

export function computeDayPillar(normalizedISO: string): Pillar {
  const target = new Date(normalizedISO);
  const diffDays =
    Math.floor((target.getTime() - JIA_ZI_EPOCH.getTime()) / 86400000);

  const index = ((diffDays % 60) + 60) % 60;
  return SEXAGENARY_CYCLE[index];
}
