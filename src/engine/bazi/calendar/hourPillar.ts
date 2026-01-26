import { Pillar, Branch, Stem } from "../../shared/types";
import { BRANCHES, STEMS } from "./sexagenary";

/**
 * Zi hour starts at 23:00 (SSOT).
 */
export function computeHourBranch(hour: number): Branch {
  const adjusted = (hour + 1) % 24;
  const index = Math.floor(adjusted / 2);
  return BRANCHES[index];
}

/**
 * Hour stem derived from Day stem (fixed table rule).
 */
export function computeHourStem(dayStem: Stem, hourBranch: Branch): Stem {
  const dayIndex = STEMS.indexOf(dayStem);
  const branchIndex = BRANCHES.indexOf(hourBranch);
  return STEMS[(dayIndex * 2 + branchIndex) % 10];
}

export function computeHourPillar(dayStem: Stem, hour: number): Pillar {
  const branch = computeHourBranch(hour);
  const stem = computeHourStem(dayStem, branch);
  return { stem, branch };
}
