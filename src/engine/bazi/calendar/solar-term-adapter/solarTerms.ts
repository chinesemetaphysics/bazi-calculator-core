/**
 * Approximate solar term dates (UTC) for v1.
 * Precision: sufficient for BaZi boundaries.
 * Replaceable with ephemeris without API change.
 */
export const SOLAR_TERMS = [
  { name: "立春", month: 2, day: 4 },
  { name: "惊蛰", month: 3, day: 6 },
  { name: "清明", month: 4, day: 5 },
  { name: "立夏", month: 5, day: 6 },
  { name: "芒种", month: 6, day: 6 },
  { name: "小暑", month: 7, day: 7 },
  { name: "立秋", month: 8, day: 8 },
  { name: "白露", month: 9, day: 8 },
  { name: "寒露", month: 10, day: 8 },
  { name: "立冬", month: 11, day: 7 },
  { name: "大雪", month: 12, day: 7 },
  { name: "小寒", month: 1, day: 6 },
];
