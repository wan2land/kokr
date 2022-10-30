import { cache } from "./cache.ts";
import { getHolidaysFromHttp } from "./holiday.ts";

export const getHolidays = cache(getHolidaysFromHttp);

function format(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [
    year,
    month >= 10 ? month : `0${month}`,
    day >= 10 ? day : `0${day}`,
  ].join("-");
}

async function _isHoliday(d: Date): Promise<boolean> {
  const dayOfWeek = d.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return true;
  }

  const formattedDate = format(d);
  const holidays = await getHolidays(d.getFullYear());
  const found = holidays.find((holiday) => holiday.date === formattedDate);

  return !!found?.holiday;
}

/** return is holiday */
export function isHoliday(date: string): Promise<boolean> {
  return _isHoliday(new Date(date));
}

/**
 * 영업일 기준 n일 후 반환
 * @param date YYYY-MM-DD
 * @param daysAfter n일
 * @returns YYYY-MM-DD
 */
export async function getNextBusinessDay(
  date: string,
  daysAfter: number,
): Promise<string> {
  const d = new Date(date);
  while (daysAfter !== 0) {
    if (daysAfter > 0) {
      do {
        d.setDate(d.getDate() + 1);
      } while (await _isHoliday(d));
      daysAfter--;
    } else {
      do {
        d.setDate(d.getDate() - 1);
      } while (await _isHoliday(d));
      daysAfter++;
    }
  }
  return format(d);
}
