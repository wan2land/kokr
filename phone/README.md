# koKR - phone

<p>
  <a href="https://github.com/wan2land/kokr/actions"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/wan2land/kokr/ci.yml?branch=main&logo=github&style=flat-square" /></a>
  <a href="https://codecov.io/gh/wan2land/kokr"><img alt="Coverage" src="https://img.shields.io/codecov/c/gh/wan2land/kokr?style=flat-square" /></a>
  <img alt="License" src="https://img.shields.io/npm/l/@kokr/phone.svg?style=flat-square" />
  <img alt="Language Typescript" src="https://img.shields.io/badge/language-Typescript-007acc.svg?style=flat-square" />
  <br />
  <a href="https://deno.land/x/kokr/phone"><img alt="deno.land/x/kokr/phone" src="https://img.shields.io/badge/dynamic/json?url=https://api.github.com/repos/wan2land/kokr/tags&query=$[0].name&display_name=tag&label=deno.land/x/kokr@&style=flat-square&logo=deno&labelColor=000&color=777&suffix=/phone" /></a>
  <a href="https://www.npmjs.com/package/@kokr/phone"><img alt="Version" src="https://img.shields.io/npm/v/@kokr/phone.svg?style=flat-square&logo=npm" /></a>
  <a href="https://npmcharts.com/compare/@kokr/phone?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dt/@kokr/phone.svg?style=flat-square" /></a>
</p>

전화번호와 관련된 유틸리티 함수를 제공합니다.

## 설치

```bash
npm install @kokr/phone
```

만약, Deno를 사용한다면 아래와 같이 import 할 수 있습니다.

```typescript
import {} from "https://deno.land/x/kokr/phone/mod.ts";
```

## 사용법

**전화번호 포매팅**

전화번호를 포매팅합니다.

```typescript
import { format } from "@kokr/phone";

format("0212341234"); // '02-1234-1234'
format("021231234"); // '02-123-1234'
format("16881234"); // '1688-1234'
```

특수문자(`#`, `*`)를 포함한 포매팅도 가능합니다.

```typescript
format("02****####"); // '02-****-####'
```

## API

[API 문서 보기](https://deno.land/x/kokr/phone/mod.ts)
