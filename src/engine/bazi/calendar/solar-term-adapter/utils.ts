import { SOLAR_TERMS } from "./solarTerms";

export function getSolarTermDates(year: number): Date[] {
  return SOLAR_TERMS.map(t =>
    new Date(Date.UTC(year, t.month - 1, t.day))
  ).sort((a, b) => a.getTime() - b.getTime());
}

export function nearestSolarTerm(
  iso: string,
  direction: "forward" | "reverse"
): number {
  const date = new Date(iso);
  const year = date.getUTCFullYear();
  const terms = [
    ...getSolarTermDates(year - 1),
    ...getSolarTermDates(year),
    ...getSolarTermDates(year + 1),
  ];

  const diffs = terms.map(d => d.getTime() - date.getTime());
  const candidates =
    direction === "forward"
      ? diffs.filter(d => d >= 0)
      : diffs.filter(d => d <= 0);

  const nearest = direction === "forward"
    ? Math.min(...candidates)
    : Math.max(...candidates);

  return Math.abs(Math.floor(nearest / 86400000));
}
