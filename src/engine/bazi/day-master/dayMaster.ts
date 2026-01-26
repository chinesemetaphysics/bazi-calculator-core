import { Stem } from "../../shared/types";
import { STEM_ELEMENT, STEM_POLARITY } from "../ten-gods/elements";

export function computeDayMaster(dayStem: Stem) {
  return {
    stem: dayStem,
    element: STEM_ELEMENT[dayStem],
    polarity: STEM_POLARITY[dayStem],
  };
}
