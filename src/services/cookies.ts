import { Time } from "@/services/enums";
import { getTimeByUnit } from "@/services/time";

const getCookieByName = (name: string): string => {
  const split: Array<string> = document.cookie.split(`${name}=`);

  const lastElementRemoved: string | undefined = split.pop();
  if (!lastElementRemoved) return "";

  return String(lastElementRemoved.split(";").shift());
};

const saveCookieByName = (name: string, value: string, expire: number): void => {
  const date: Date = new Date();
  date.setTime(date.getTime() + getTimeByUnit(Time.UNIT_DAY, expire));

  const expires: string = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires};`;
};

export { getCookieByName, saveCookieByName };
