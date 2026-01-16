import { Pillar } from "../../shared/types";

/**
 * SSOT:
 * - Year flow changes at 立春
 * - Month flow changes at solar terms
 * 
 * Backed by precise calendar adapters.
 */
export function computeYearFlow(_: string): Pillar {
  throw new Error("YEAR_FLOW_NOT_IMPLEMENTED_SSOT_SOLAR_TERM_REQUIRED");
}

export function computeMonthFlow(_: string): Pillar {
  throw new Error("MONTH_FLOW_NOT_IMPLEMENTED_SSOT_SOLAR_TERM_REQUIRED");
}
