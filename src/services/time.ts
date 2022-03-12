type unit = "second" | "minute" | "hour" | "day" | "week";

const getTimeByUnit = (unit: unit, amount: number) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  return eval(unit) * amount;
};

export { getTimeByUnit };
