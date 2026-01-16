import { computeBaZiChart } from "../bazi";
import { SolarTermAdapterV1 } from "../bazi/calendar/solar-term-adapter";

test("BaZi integration with solar-term adapter", () => {
  const chart = computeBaZiChart({
    normalizedISO: "1990-03-10T05:00:00Z",
    gender: "male",
    solar: SolarTermAdapterV1,
    pillars: {
      year: { stem: "庚", branch: "午" },
      month: { stem: "己", branch: "卯" },
      day: { stem: "甲", branch: "子" },
      hour: { stem: "丁", branch: "卯" },
    },
  });

  expect(chart.luckPillars.startAge.years).toBeGreaterThanOrEqual(0);
});
