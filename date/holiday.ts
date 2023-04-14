export type RetrieveHolidays = (year: number) => Promise<DateInfo[]>;

/** 공휴일의 종류, Holiday 공휴일  */
export enum DateKind {
  /** 공휴일 - (예) 설날, 대통령선거일, 추석 (대체공휴일) .. */
  Holiday = 1,
  /** 기념일 - (예) 스승의 날, 국군의 날 .. */
  Anniversary = 2,
  /** 24절기 - (예) 입춘, 경칩 .. */
  SolarTerms = 3,
  /** 잡절 - (예) 정월대보름, 초복, 중복 .. */
  Sundry = 4,
}

/** 공휴일 상세 정보 */
export interface DateInfo {
  /** YYYY-MM-DD */
  date: string;
  /** 이름 */
  name: string;
  /**  공휴일 여부 */
  holiday: boolean;
  /**  API에서 주는 정보, 해당 기념일에 대한 기타 설명이 포함된 경우가 있음. */
  remarks: string | null;
  /**  공휴일인지, 기념일인지, 24절기인지.. enum 참고*/
  kind: DateKind;
  /**  HH:mm 정확한 표준 시간, DateKind.SolarTerms(24절기) 경우 반환 */
  time: string | null;
  /**  태양황경(도), DateKind.SolarTerms(24절기) 경우 반환 */
  sunLng: number | null;
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
