# koKR - id

## 설치방법

```bash
npm install @kokr/id
```

```typescript
import { analyze, validate } from "@kokr/id";

// 주민번호 분석
analyze("000101-1000002");
/*
{
  valid: true, // 올바른 주민번호 여부
  parity: 2, // 주민번호 맨 뒤 검증코드
  gender: 'M', // 성별
  foreigner: false, // 외국인여부
  birth: '1900-01-01', // 생일 (2003-02-29와 같이 존재하지 않는 경우 null 반환)
  age: 121, // 만나이
  krAge: 122, // 한국나이
}
*/

// 주민번호 분석 (now에는 기준 날짜. age, krAge 계산할 때 기준)
analyze("000101-1000002", { now: "2021-06-01" });

// 일반 주민등록번호 (외국인 등록번호 미포함)
validate("010101 - 0010101");

// 외국인 등록번호 포함
validate("010101-5010105", { enableForeigner: true });
validate("010101-6010108", { enableForeigner: true });
validate("010101-7010101", { enableForeigner: true });
validate("010101-8010103", { enableForeigner: true });
```
