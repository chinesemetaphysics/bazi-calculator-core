import { Pillar } from "../../shared/types";

export interface SolarTermAdapter {
  computeYearPillar(normalizedISO: string): Pillar;
  computeMonthPillar(normalizedISO: string): Pillar;
  computeYearFlow(normalizedISO: string): Pillar;
  computeMonthFlow(normalizedISO: string): Pillar;
  daysToNearestSolarTerm(normalizedISO: string, direction: "forward" | "reverse"): number;
}
