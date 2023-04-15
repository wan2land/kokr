# koKR - id

<p>
  <a href="https://github.com/wan2land/kokr/actions"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/wan2land/kokr/ci.yml?branch=main&logo=github&style=flat-square" /></a>
  <a href="https://codecov.io/gh/wan2land/kokr"><img alt="Coverage" src="https://img.shields.io/codecov/c/gh/wan2land/kokr?style=flat-square" /></a>
  <img alt="License" src="https://img.shields.io/npm/l/@kokr/id.svg?style=flat-square" />
  <img alt="Language Typescript" src="https://img.shields.io/badge/language-Typescript-007acc.svg?style=flat-square" />
  <br />
  <a href="https://deno.land/x/kokr/id"><img alt="deno.land/x/kokr/id" src="https://img.shields.io/badge/dynamic/json?url=https://api.github.com/repos/wan2land/kokr/tags&query=$[0].name&display_name=tag&label=deno.land/x/kokr@&style=flat-square&logo=deno&labelColor=000&color=777&suffix=/id" /></a>
  <a href="https://www.npmjs.com/package/@kokr/id"><img alt="Version" src="https://img.shields.io/npm/v/@kokr/id.svg?style=flat-square&logo=npm" /></a>
  <a href="https://npmcharts.com/compare/@kokr/id?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dt/@kokr/id.svg?style=flat-square" /></a>
</p>

주민등록번호와 관련한 유틸리티를 제공합니다.

## 설치

```bash
npm install @kokr/id
```

만약, Deno를 사용한다면 아래와 같이 import 할 수 있습니다.

```typescript
import {} from "https://deno.land/x/kokr/id/mod.ts";
```

## 사용법

> 테스트에 사용한 주민등록번호 및 외국인등록번호는 아무 숫자나 입력 후,
> 검증코드를 계산하여 만든 번호로서 실제로 존재하지 않는 번호입니다.

**주민등록번호 및 외국인등록번호 분석**

주민등록번호 및 외국인등록번호를 분석해, 등록번호의 유효성, 성별, 외국인 여부,
생일, 나이 등을 알 수 있습니다. 입력된 등록번호는 숫자를 제외한 모든 문자를
제거하고 분석합니다. 따라서 중간에 하이픈('-')여부에 관계없이 사용가능합니다.
자세한 내용은 데이터 구조를 참고하세요.

```typescript
import { analyze } from "@kokr/id";

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
```

만나이와 한국식 나이는 오늘날짜 기준으로 계산합니다. 만약, 다른 날짜를 기준으로
계산하고 싶다면 `now` 옵션을 사용할 수 있습니다.

```typescript
analyze("000101-1000002", { now: "2021-06-01" });
```

**주민등록번호 및 외국인등록번호 검증**

주민등록번호 및 외국인등록번호의 유효성을 검증합니다. 검증결과는 `boolean`으로
반환됩니다. 외국인등록번호를 제외한 주민등록번호만 검증하고 싶다면
`disableForeigner` 옵션을 사용할 수 있습니다.

```typescript
import { validate } from "@kokr/id";

// 주민등록번호 및 외국인등록번호 검증
validate("010101-0010101");
validate("010101-5010105");
validate("010101-6010108");
validate("010101-7010101");
validate("010101-8010103");

// 주민등록번호만 검증 (외국인등록번호 제외)
validate("010101-5010105", { disableForeigner: true }); // false
validate("010101-6010108", { disableForeigner: true }); // false
validate("010101-7010101", { disableForeigner: true }); // false
validate("010101-8010103", { disableForeigner: true }); // false
```

**주민등록번호 및 외국인등록번호 포매팅**

주민등록번호 및 외국인등록번호를 포매팅합니다. 포매팅된 결과는 `string`으로
반환됩니다. 숫자를 제외한 모든 문자는 제거되며, 하이픈('-')이 포함됩니다.

```typescript
import { format } from "@kokr/id";

format("0101010010101"); // 010101-0010101
```

기본적으로 잘못된 주민등록번호는 포매팅 처리하지 않습니다. 잘못된 경우 null을
반환합니다.

```typescript
format("01234"); // null
```

자릿수가 다르거나, 잘못된 주민등록번호를 포매팅하고 싶다면 `ignoreInvalid`
옵션을 사용할 수 있습니다.

```typescript
format("010101", { ignoreInvalid: true }); // 010101
format("0101010", { ignoreInvalid: true }); // 010101-0
format("01010100101019", { ignoreInvalid: true }); // 010101-00101019
```

## 데이터 구조

**등록번호 분석결과(AnalyzeResult)**

| 속성        | 타입                     | 설명                                                 |
| ----------- | ------------------------ | ---------------------------------------------------- |
| `valid`     | `boolean`                | 주어진 주민등록번호가 올바른지                       |
| `parity`    | `number` \| `null`       | 주민등록번호의 패리티 값, 잘못된 주민등록번호의 반환 |
| `gender`    | `"M"` \| `"F"` \| `null` | 성별, M은 남성, F는 여성                             |
| `foreigner` | `boolean` \| `null`      | 외국인 여부                                          |
| `birth`     | `string` \| `null`       | 생년월일                                             |
| `age`       | `number` \| `null`       | 만나이                                               |
| `krAge`     | `number` \| `null`       | 한국나이                                             |

## API

[API 문서 보기](https://deno.land/x/kokr/id/mod.ts)
