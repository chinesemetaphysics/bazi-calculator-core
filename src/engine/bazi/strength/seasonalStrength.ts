import { Element } from "../ten-gods/elements";
import { Branch } from "../../shared/types";

/**
 * Month branch → dominant element (SSOT simplified table)
 */
export const SEASON_ELEMENT: Record<Branch, Element> = {
  寅: "Wood",
  卯: "Wood",
  辰: "Earth",
  巳: "Fire",
  午: "Fire",
  未: "Earth",
  申: "Metal",
  酉: "Metal",
  戌: "Earth",
  亥: "Water",
  子: "Water",
  丑: "Earth",
};
