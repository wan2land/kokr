import { DateInfo, RetrieveHolidays } from "./holiday.ts";

interface HolidayCache {
  [year: number]: {
    cached: number; // timestamp
    holidays: DateInfo[];
  };
}

export interface CacheOptions {
  ttl?: number; // micro seconds
  cacheKeyName?: string;
}

export function cache(
  fn: RetrieveHolidays,
  options: CacheOptions = {},
): RetrieveHolidays & { clear: () => void } {
  const ttl = Math.max(options.ttl ?? 86400, 0);
  const cacheKeyName = options.cacheKeyName ??
    "@kokr/date/holidays";

  return Object.assign(async (year: number) => {
    const now = Date.now();
    let cacheData: HolidayCache = {};
    try {
      cacheData = JSON.parse(
        localStorage.getItem(cacheKeyName) ?? "",
      );
    } catch {
      // ignore
    }
    const cache = cacheData[year];
    if (cache && cache.cached + ttl > now) {
      return cache.holidays;
    }
    const holidays = await fn(year);
    cacheData[year] = {
      cached: now,
      holidays,
    };
    localStorage.setItem(
      cacheKeyName,
      JSON.stringify(cacheData),
    );
    return holidays;
  }, {
    clear() {
      localStorage.removeItem(cacheKeyName);
    },
  });
}
