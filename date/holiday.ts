export type RetrieveHolidays = (year: number) => Promise<DateInfo[]>;

export enum DateKind {
  Holiday = 1, // 공휴일 - (예) 설날, 대통령선거일, 추석 (대체공휴일) ..
  Anniversary = 2, // 기념일 - (예) 스승의 날, 국군의 날 ..
  SolarTerms = 3, // 24절기 - (예) 입춘, 경칩 ..
  Sundry = 4, // 잡절 - (예) 정월대보름, 초복, 중복 ..
}

export interface DateInfo {
  date: string; // YYYY-MM-DD
  name: string; // 이름
  holiday: boolean; // 공휴일 여부
  remarks: string | null;
  kind: DateKind;
  time: string | null; // HH:mm (only SolarTerms)
  sunLng: number | null; // only SolarTerms
}

const defaultHolidayUri: ((year: number) => string)[] = [
  (year) => `https://holidays.dist.be/${year}.json`,
  (year) => `https://cdn.jsdelivr.net/gh/distbe/holidays@gh-pages/${year}.json`,
];

export interface GetHolidaysFromHttpOptions {
  uris?: ((year: number) => string)[];
}

export async function getHolidaysFromHttp(
  year: number,
  options?: GetHolidaysFromHttpOptions,
): Promise<DateInfo[]> {
  const uris = options?.uris ?? defaultHolidayUri;
  if (uris.length === 0) {
    return [];
  }
  const uri = uris[Math.random() * uris.length | 0](year);
  const response = await fetch(uri);
  if (response.status === 200) {
    return response.json() as Promise<DateInfo[]>;
  }

  return [];
}
