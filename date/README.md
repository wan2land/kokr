# koKR - date

<p>
  <a href="https://github.com/wan2land/kokr/actions"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/wan2land/kokr/ci.yml?branch=main&logo=github&style=flat-square" /></a>
  <a href="https://codecov.io/gh/wan2land/kokr"><img alt="Coverage" src="https://img.shields.io/codecov/c/gh/wan2land/kokr?style=flat-square" /></a>
  <img alt="License" src="https://img.shields.io/npm/l/@kokr/date.svg?style=flat-square" />
  <img alt="Language Typescript" src="https://img.shields.io/badge/language-Typescript-007acc.svg?style=flat-square" />
  <br />
  <a href="https://deno.land/x/kokr/date"><img alt="deno.land/x/kokr/date" src="https://img.shields.io/badge/dynamic/json?url=https://api.github.com/repos/wan2land/kokr/tags&query=$[0].name&display_name=tag&label=deno.land/x/kokr@&style=flat-square&logo=deno&labelColor=000&color=777&suffix=/date" /></a>
  <a href="https://www.npmjs.com/package/@kokr/date"><img alt="Version" src="https://img.shields.io/npm/v/@kokr/date.svg?style=flat-square&logo=npm" /></a>
  <a href="https://npmcharts.com/compare/@kokr/date?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dt/@kokr/date.svg?style=flat-square" /></a>
</p>

한국의 공휴일, 기념일, 24절기 및 잡절을 제공합니다. 공휴일 정보는 외부 API를
통해 가져오며, 라이브러리 업데이트 없이도 항상 최신 정보를 가져올 수 있습니다.
또한, Web Store API를 활용(Node.js의 경우
[shim-webstore](https://github.com/denostack/node-shim-webstore) 적용)하여
하루단위로 캐싱처리하기 때문에 굉장히 빠르게 사용가능합니다.

@koKR date는 [distbe/holidays](https://github.com/distbe/holidays)의
공휴일정보를 사용하고 있고,
[distbe/holidays](https://github.com/distbe/holidays)는 공공데이터포탈의 공휴일
정보를 활용하고 있습니다.

## 설치

```bash
npm install @kokr/date
```

만약, Deno를 사용한다면 아래와 같이 import 할 수 있습니다.

```typescript
import {} from "https://deno.land/x/kokr/date/mod.ts";
```

## 사용법

**공휴일 가져오기**

년도를 입력하면 해당 년도의 모든 공휴일, 기념일, 24절기 및 잡절 정보를
가져옵니다. 자세한 내용은 하단의 데이터 구조를 참고하세요.

```typescript
import { getHolidays } from "@kokr/date";

// 공휴일 정보 가져오기
const dates = await getHolidays(2022);
/*
[
  {
    "date": "2022-01-01",
    "name": "새해",
    "holiday": true,
    "remarks": null,
    "kind": 1,
    "time": null,
    "sunLng": null
  },
  {
    "date": "2022-01-05",
    "name": "소한",
    "holiday": false,
    "remarks": null,
    "kind": 3,
    "time": "18:14",
    "sunLng": 285
  },
  ...
]
*/
```

**영업일 계산**

공휴일(토요일, 일요일, 기념일)을 제외한 영업일을 계산합니다.

```typescript
import { getNextBusinessDay } from "@kokr/date";

const date = await getNextBusinessDay("2022-01-01", 10);
```

**공휴일 여부**

공휴일(토요일, 일요일, 기념일)인 경우, true를 반환합니다.

```typescript
import { isHoliday } from "@kokr/date";

const holiday = await isHoliday("2022-01-01"); // true
```

## 데이터 구조

**공휴일 상세정보 타입(DateInfo)**

| 속성    | 타입               | 설명                                                                  |
| ------- | ------------------ | --------------------------------------------------------------------- |
| date    | `string`           | 공휴일 날짜 (YYYY-MM-DD)                                              |
| name    | `string`           | 공휴일 이름                                                           |
| holiday | `boolean`          | 공휴일 여부                                                           |
| remarks | `string` \| `null` | API에서 주는 정보, 해당 기념일에 대한 기타 설명이 포함된 경우가 있음. |
| kind    | `DateKind`         | 공휴일인지, 기념일인지, 24절기인지.. enum 참고                        |
| time    | `string` \| `null` | HH:mm 정확한 표준 시간, DateKind.SolarTerms(24절기) 경우 반환         |
| sunLng  | `number` \| `null` | 태양황경(도), DateKind.SolarTerms(24절기) 경우 반환                   |

**공휴일 종류 (DateKind)**

| 값            | 설명   | 예시                                     |
| ------------- | ------ | ---------------------------------------- |
| `Holiday`     | 공휴일 | 설날, 대통령선거일, 추석 (대체공휴일) 등 |
| `Anniversary` | 기념일 | 스승의 날, 국군의 날 등                  |
| `SolarTerms`  | 24절기 | 입춘, 경칩 등                            |
| `Sundry`      | 잡절   | 정월대보름, 초복, 중복 등                |

## API

[API 문서 보기](https://deno.land/x/kokr/date/mod.ts)
