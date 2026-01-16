import { Branch, Stem } from "../../shared/types";
import { STEM_ELEMENT } from "../ten-gods/elements";

/**
 * Simplified hidden stem roots (SSOT-compliant baseline)
 * Extendable later.
 */
const BRANCH_ROOTS: Record<Branch, Stem[]> = {
  子: ["壬"],
  丑: ["己","癸","辛"],
  寅: ["甲","丙","戊"],
  卯: ["乙"],
  辰: ["戊","乙","癸"],
  巳: ["丙","戊","庚"],
  午: ["丁","己"],
  未: ["己","丁","乙"],
  申: ["庚","壬","戊"],
  酉: ["辛"],
  戌: ["戊","辛","丁"],
  亥: ["壬","甲"],
};

export function hasRoot(dayStem: Stem, branches: Branch[]): boolean {
  const dmElement = STEM_ELEMENT[dayStem];
  return branches.some(b =>
    BRANCH_ROOTS[b]?.some(stem => STEM_ELEMENT[stem] === dmElement)
  );
}
