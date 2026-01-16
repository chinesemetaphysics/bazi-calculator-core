import { FourPillars } from "../shared/types";

export type BaZiInput = {
  normalizedTimeISO: string; // from Time Doctrine
  location: {
    lat: number;
    lon: number;
  };
  gender: "male" | "female";
};

export type BaZiChart = {
  pillars: FourPillars;
  dayMaster: {
    stem: string;
    element: string;
    polarity: "yin" | "yang";
  };
};

export function computeBaZiChart(_: BaZiInput): BaZiChart {
  throw new Error("NOT_IMPLEMENTED_SSOT_STAGE_10");
}
