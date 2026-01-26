import { Stem, Branch, Pillar } from "../../shared/types";

export const STEMS: Stem[] = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
export const BRANCHES: Branch[] = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

export const SEXAGENARY_CYCLE: Pillar[] = Array.from({ length: 60 }, (_, i) => ({
  stem: STEMS[i % 10],
  branch: BRANCHES[i % 12],
}));
