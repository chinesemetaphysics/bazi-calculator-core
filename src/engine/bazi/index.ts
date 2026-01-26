import { FourPillars } from "../shared/types";
import { computeDayMaster } from "./day-master/dayMaster";
import { computeTenGod } from "./ten-gods";
import { classifyStrength } from "./strength/strengthClassifier";
import { computeLuckDirection, Gender } from "./luck-pillars/direction";
import { computeStartAge } from "./luck-pillars/startAge";
import { sequenceLuckPillars } from "./luck-pillars/sequence";
import { computeDayHourFlow } from "./flows/dayHourFlow";
import { FlowContext } from "./flows/types";
import { SolarTermAdapter } from "./calendar/adapters";

export type BaZiInput = {
  pillars: FourPillars;
  gender: Gender;
  normalizedISO: string;
  solar: SolarTermAdapter;
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
  luckPillars: {
    direction: "forward" | "reverse";
    startAge: { years: number; months: number };
    sequence: FourPillars["year"][];
  };
  flows: FlowContext;
};

export function computeBaZiChart(input: BaZiInput): BaZiChart {
  const { pillars, gender, normalizedISO, solar } = input;

  if (!solar) {
    throw new Error("SOLAR_TERM_ADAPTER_REQUIRED");
  }

  const dm = computeDayMaster(pillars.day.stem);
  const direction = computeLuckDirection(dm.polarity, gender);
  const days = solar.daysToNearestSolarTerm(normalizedISO, direction);
  const startAge = computeStartAge(days, direction);
  const sequence = sequenceLuckPillars(pillars.month, direction);

  const dayHourFlow = computeDayHourFlow(normalizedISO, pillars.day.stem);

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
    luckPillars: {
      direction,
      startAge,
      sequence,
    },
    flows: {
      year: solar.computeYearFlow(normalizedISO),
      month: solar.computeMonthFlow(normalizedISO),
      day: dayHourFlow.day,
      hour: dayHourFlow.hour,
    },
  };
}
