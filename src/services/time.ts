import { Time } from "@/services/enums";

type unit = Time.UNIT_SECOND | Time.UNIT_MINUTE | Time.UNIT_HOUR | Time.UNIT_DAY | Time.UNIT_WEEK;

const getTimeByUnit = (unit: unit, amount: number): number => {
  const t: Record<string, number> = {};

  t[Time.UNIT_SECOND] = 1000;
  t[Time.UNIT_MINUTE] = t[Time.UNIT_SECOND] * 60;
  t[Time.UNIT_HOUR] = t[Time.UNIT_MINUTE] * 60;
  t[Time.UNIT_DAY] = t[Time.UNIT_HOUR] * 24;
  t[Time.UNIT_WEEK] = t[Time.UNIT_DAY] * 7;

  return t[unit] * amount;
};

export type { unit };
export { getTimeByUnit };
