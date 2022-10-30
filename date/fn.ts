import { cache } from "./cache.ts";
import { DateInfo as _DateInfo, getHolidaysFromHttp } from "./holiday.ts";

/**
 * 서버에서 공휴일 관련 정보를 가져옵니다. / Get Holidays from Http Server
 * @type {(year: number) => Promise<_DateInfo[]>}
 * @param {number} year
 * @return {Promise<_DateInfo[]>}
 */
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

/**
 * 공휴일인지 아닌지 판단 / return is holiday
 * @param {string} date YYYY-MM-DD
 * @return {Promise<boolean>}
 */
export function isHoliday(date: string): Promise<boolean> {
  return _isHoliday(new Date(date));
}

/**
 * 영업일 기준 n일 후 반환 / After n business days
 * @param {string} date YYYY-MM-DD 형식
 * @param {number} daysAfter n일, 양수 음수 모두 사용 가능
 * @returns {string} YYYY-MM-DD
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
