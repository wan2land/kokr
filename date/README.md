# koKR - date

@koKR date는 [distbe/holidays](https://github.com/distbe/holidays)의 공휴일정보를 사용합니다.
Deno의 localStorage를 활용 하루단위로 캐싱처리합니다.

## 사용법

```bash
npm install @kokr/date
```

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
