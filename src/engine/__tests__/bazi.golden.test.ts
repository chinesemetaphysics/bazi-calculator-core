import { computeBaZiChart } from "../bazi";
import { SolarTermAdapter } from "../bazi/calendar/adapters";

const mockSolar: SolarTermAdapter = {
  computeYearPillar: () => ({ stem: "甲", branch: "辰" }),
  computeMonthPillar: () => ({ stem: "丙", branch: "寅" }),
  computeYearFlow: () => ({ stem: "甲", branch: "辰" }),
  computeMonthFlow: () => ({ stem: "丙", branch: "寅" }),
  daysToNearestSolarTerm: () => 15,
};

test("BaZi core golden vector", () => {
  const chart = computeBaZiChart({
    normalizedISO: "1984-02-02T01:00:00Z",
    gender: "male",
    solar: mockSolar,
    pillars: {
      year: { stem: "甲", branch: "子" },
      month: { stem: "丙", branch: "寅" },
      day: { stem: "甲", branch: "子" },
      hour: { stem: "乙", branch: "丑" },
    },
  });

  expect(chart.dayMaster.stem).toBe("甲");
  expect(chart.luckPillars.sequence.length).toBeGreaterThan(0);
});
