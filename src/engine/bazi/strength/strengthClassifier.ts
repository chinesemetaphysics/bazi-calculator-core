import { FourPillars } from "../../shared/types";
import { Element } from "../ten-gods/elements";
import { SEASON_ELEMENT } from "./seasonalStrength";
import { hasRoot } from "./rooting";

export type Strength =
  | "Strong"
  | "Weak"
  | "Balanced"
  | "Follow";

export function classifyStrength(
  pillars: FourPillars,
  dayElement: Element
): Strength {
  const monthBranch = pillars.month.branch;
  const seasonElement = SEASON_ELEMENT[monthBranch];

  const rooted = hasRoot(
    pillars.day.stem,
    [pillars.day.branch, pillars.month.branch, pillars.year.branch, pillars.hour.branch]
  );

  // Follow structure: no root and season opposes DM
  if (!rooted && seasonElement !== dayElement) {
    return "Follow";
  }

  if (seasonElement === dayElement && rooted) {
    return "Strong";
  }

  if (seasonElement !== dayElement && !rooted) {
    return "Weak";
  }

  return "Balanced";
}
