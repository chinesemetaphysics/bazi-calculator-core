export type Stem =
  | "甲" | "乙" | "丙" | "丁" | "戊"
  | "己" | "庚" | "辛" | "壬" | "癸";

export type Branch =
  | "子" | "丑" | "寅" | "卯" | "辰" | "巳"
  | "午" | "未" | "申" | "酉" | "戌" | "亥";

export type Pillar = {
  stem: Stem;
  branch: Branch;
};

export type FourPillars = {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
};
