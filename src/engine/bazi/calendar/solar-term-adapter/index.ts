import { SolarTermAdapter } from "../adapters";
import { nearestSolarTerm } from "./utils";
import { SEXAGENARY_CYCLE } from "../sexagenary";
import { Pillar } from "../../../shared/types";

/**
 * v1 Solar Term Adapter
 * Uses approximate term dates.
 */
export const SolarTermAdapterV1: SolarTermAdapter = {
  computeYearPillar(normalizedISO: string): Pillar {
    const d = new Date(normalizedISO);
    const year = d.getUTCFullYear();
    const liChun = new Date(Date.UTC(year, 1, 4)); // Feb 4

    const effectiveYear = d >= liChun ? year : year - 1;
    const baseYear = 1984; // 甲子年
    const index = ((effectiveYear - baseYear) % 60 + 60) % 60;
    return SEXAGENARY_CYCLE[index];
  },

  computeMonthPillar(normalizedISO: string): Pillar {
    const d = new Date(normalizedISO);
    const monthIndex = d.getUTCMonth();
    // Month stems/branches progress from 寅 starting at 立春
    const baseIndex = 2; // 寅
    const idx = (baseIndex + monthIndex) % 12;
    return {
      stem: SEXAGENARY_CYCLE[idx].stem,
      branch: SEXAGENARY_CYCLE[idx].branch,
    };
  },

  computeYearFlow(normalizedISO: string): Pillar {
    return this.computeYearPillar(normalizedISO);
  },

  computeMonthFlow(normalizedISO: string): Pillar {
    return this.computeMonthPillar(normalizedISO);
  },

  daysToNearestSolarTerm(normalizedISO: string, direction) {
    return nearestSolarTerm(normalizedISO, direction);
  },
};
