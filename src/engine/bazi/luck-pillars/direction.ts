import { Polarity } from "../ten-gods/elements";

export type Gender = "male" | "female";
export type Direction = "forward" | "reverse";

/**
 * SSOT:
 * Yang DM: male=forward, female=reverse
 * Yin  DM: male=reverse, female=forward
 */
export function computeLuckDirection(
  dayPolarity: Polarity,
  gender: Gender
): Direction {
  if (dayPolarity === "yang") {
    return gender === "male" ? "forward" : "reverse";
  }
  return gender === "male" ? "reverse" : "forward";
}
