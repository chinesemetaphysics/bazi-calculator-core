import { FourPillars } from "../shared/types";
import { computeDayMaster } from "./day-master/dayMaster";
import { computeTenGod } from "./ten-gods";
import { classifyStrength } from "./strength/strengthClassifier";

export type BaZiInput = {
  pillars: FourPillars;
};

export type BaZiChart = {
  pillars: FourPillars;
  dayMaster: {
    stem: string;
    element: string;
    polarity: "yin" | "yang";
  };
  strength: string;
  tenGods: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
};

export function computeBaZiChart(input: BaZiInput): BaZiChart {
  const { pillars } = input;
  const dm = computeDayMaster(pillars.day.stem);

  return {
    pillars,
    dayMaster: dm,
    strength: classifyStrength(pillars, dm.element),
    tenGods: {
      year: computeTenGod(pillars.day.stem, pillars.year.stem),
      month: computeTenGod(pillars.day.stem, pillars.month.stem),
      day: "Friend",
      hour: computeTenGod(pillars.day.stem, pillars.hour.stem),
    },
  };
}
