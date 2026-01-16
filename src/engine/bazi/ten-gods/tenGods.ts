import { Stem } from "../../shared/types";
import {
  Element,
  Polarity,
  STEM_ELEMENT,
  STEM_POLARITY,
  GENERATES,
  CONTROLS,
} from "./elements";

export type TenGod =
  | "Friend"        // 比肩
  | "RobWealth"     // 劫财
  | "EatingGod"     // 食神
  | "HurtingOfficer"// 伤官
  | "DirectResource"// 正印
  | "IndirectResource" // 偏印
  | "DirectWealth"  // 正财
  | "IndirectWealth"// 偏财
  | "DirectOfficer" // 正官
  | "SevenKillings";// 七杀

export function computeTenGod(dayStem: Stem, targetStem: Stem): TenGod {
  const dmElement = STEM_ELEMENT[dayStem];
  const dmPolarity = STEM_POLARITY[dayStem];
  const tElement = STEM_ELEMENT[targetStem];
  const tPolarity = STEM_POLARITY[targetStem];

  // Same element
  if (dmElement === tElement) {
    return dmPolarity === tPolarity ? "Friend" : "RobWealth";
  }

  // DM generates target
  if (GENERATES[dmElement] === tElement) {
    return dmPolarity === tPolarity ? "EatingGod" : "HurtingOfficer";
  }

  // Target generates DM
  if (GENERATES[tElement] === dmElement) {
    return dmPolarity === tPolarity ? "IndirectResource" : "DirectResource";
  }

  // DM controls target
  if (CONTROLS[dmElement] === tElement) {
    return dmPolarity === tPolarity ? "IndirectWealth" : "DirectWealth";
  }

  // Target controls DM
  if (CONTROLS[tElement] === dmElement) {
    return dmPolarity === tPolarity ? "SevenKillings" : "DirectOfficer";
  }

  throw new Error("TEN_GODS_UNRESOLVED_STATE");
}
