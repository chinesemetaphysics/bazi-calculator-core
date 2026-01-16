import { Pillar } from "../../shared/types";

/**
 * SSOT NOTE:
 * - Year pillar changes at 立春
 * - Month pillar changes at solar terms
 * 
 * This adapter will be backed by precise solar-term tables.
 */

export function computeYearPillar(_: string): Pillar {
  throw new Error("YEAR_PILLAR_NOT_IMPLEMENTED_SSOT_SOLAR_TERM_REQUIRED");
}

export function computeMonthPillar(_: string): Pillar {
  throw new Error("MONTH_PILLAR_NOT_IMPLEMENTED_SSOT_SOLAR_TERM_REQUIRED");
}
