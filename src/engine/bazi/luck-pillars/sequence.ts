import { Pillar } from "../../shared/types";
import { SEXAGENARY_CYCLE } from "../calendar/sexagenary";
import { Direction } from "./direction";

/**
 * Sequence Luck Pillars from Month Pillar.
 */
export function sequenceLuckPillars(
  monthPillar: Pillar,
  direction: Direction,
  count = 8
): Pillar[] {
  const startIndex = SEXAGENARY_CYCLE.findIndex(
    p => p.stem === monthPillar.stem && p.branch === monthPillar.branch
  );
  if (startIndex < 0) {
    throw new Error("MONTH_PILLAR_NOT_IN_SEXAGENARY_CYCLE");
  }

  const step = direction === "forward" ? 1 : -1;
  const pillars: Pillar[] = [];

  for (let i = 1; i <= count; i++) {
    const idx = (startIndex + step * i + 60) % 60;
    pillars.push(SEXAGENARY_CYCLE[idx]);
  }
  return pillars;
}
