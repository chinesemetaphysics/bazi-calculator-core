import { Direction } from "./direction";

/**
 * SSOT:
 * Forward: birth → next solar term
 * Reverse: birth → previous solar term
 *
 * Conversion:
 * 3 days = 1 year
 * remainder → months
 *
 * NOTE:
 * Solar term dates must be supplied by a precise table/adapter.
 */
export type StartAge = {
  years: number;
  months: number;
};

export function computeStartAge(
  daysToNearestSolarTerm: number,
  direction: Direction
): StartAge {
  const totalDays = Math.max(0, daysToNearestSolarTerm);
  const years = Math.floor(totalDays / 3);
  const months = Math.floor(((totalDays % 3) / 3) * 12);
  return { years, months };
}
