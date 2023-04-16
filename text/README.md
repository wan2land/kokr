# koKR - text

<p>
  <a href="https://github.com/wan2land/kokr/actions"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/wan2land/kokr/ci.yml?branch=main&logo=github&style=flat-square" /></a>
  <a href="https://codecov.io/gh/wan2land/kokr"><img alt="Coverage" src="https://img.shields.io/codecov/c/gh/wan2land/kokr?style=flat-square" /></a>
  <img alt="License" src="https://img.shields.io/npm/l/@kokr/text.svg?style=flat-square" />
  <img alt="Language Typescript" src="https://img.shields.io/badge/language-Typescript-007acc.svg?style=flat-square" />
  <br />
  <a href="https://deno.land/x/kokr/text"><img alt="deno.land/x/kokr/text" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/wan2land/kokr/main/deno.json&query=$.version&display_name=tag&label=deno.land/x/kokr@&style=flat-square&logo=deno&labelColor=000&color=777&suffix=/text" /></a>
  <a href="https://www.npmjs.com/package/@kokr/text"><img alt="Version" src="https://img.shields.io/npm/v/@kokr/text.svg?style=flat-square&logo=npm" /></a>
  <a href="https://npmcharts.com/compare/@kokr/text?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dt/@kokr/text.svg?style=flat-square" /></a>
</p>

## 설치

```bash
npm install @kokr/text
```

만약, Deno를 사용한다면 아래와 같이 import 할 수 있습니다.

```typescript
import text from "https://deno.land/x/kokr/text/mod.ts";
```

## 사용법

### 조사

은/는/이/가와 같은 조사를 자동으로 붙여주는 기능을 템플릿 리터럴(Template
Literal)을 통해 제공합니다.

```typescript
import text from "@kokr/text";

let name1 = "사과";
let name2 = "코코넛";

// 은/는
console.log(text`${name1}는 코딩 합니다.`); // 사과는 코딩 합니다.
console.log(text`${name1}은 코딩 합니다.`); // 사과는 코딩 합니다.
console.log(text`${name2}는 코딩 합니다.`); // 코코넛은 코딩 합니다.
console.log(text`${name2}은 코딩 합니다.`); // 코코넛은 코딩 합니다.

// 이/가
console.log(text`${name1}가 코딩 했습니다.`); // 사과가 코딩 했습니다.
console.log(text`${name1}이 코딩 했습니다.`); // 사과가 코딩 했습니다.
console.log(text`${name2}가 코딩 했습니다.`); // 코코넛이 코딩 했습니다.
console.log(text`${name2}이 코딩 했습니다.`); // 코코넛이 코딩 했습니다.

// 을/를
console.log(text`${name1}을 가르쳤습니다.`); // 사과를 가르쳤습니다.
console.log(text`${name1}를 가르쳤습니다.`); // 사과를 가르쳤습니다.
console.log(text`${name2}을 가르쳤습니다.`); // 코코넛을 가르쳤습니다.
console.log(text`${name2}를 가르쳤습니다.`); // 코코넛을 가르쳤습니다.

// 로/으로
let place = "대구";
console.log(text`${place}으로 갑시다.`); // 대구로 갑시다.
console.log(text`${place}로 갑시다.`); // 대구로 갑시다.

place = "부산";
console.log(text`${place}으로 갑시다.`); // 부산으로 갑시다.
console.log(text`${place}로 갑시다.`); // 부산으로 갑시다.

place = "서울"; // 예외케이스 (ㄹ로 끝나는 경우)
console.log(text`${place}으로 갑시다.`); // 서울로 갑시다.
console.log(text`${place}로 갑시다.`); // 서울로 갑시다.
```

제공하는 조사는 다음과 같습니다.

- 은/는
- 이/가
- 을/를
- 과/와
- 아/야 (모호한 케이스, 하단 설명 참고)
- 이나/나
- 이다/다
- 이든/든
- 이라/라
- 이란/란
- 이랑/랑
- 으로/로
- 이며/며
- 이셨/셨
- 이시/시
- 이야/야 (모호한 케이스, 하단 설명 참고)
- 이여/여
- 이었/였
- 이어요/여요
- 이에요/예요

**모호한 케이스**

"아/야"와 "이야/야"는 모호한 케이스가 있습니다. "야"로 끝나는 경우에는 "이야/야"
규칙이 우선적으로 적용됩니다. 명확하게 사용하려면 "이야", "아"를 사용해야
합니다.

```typescript
// 명확한 케이스
console.log(text`${"완두"}아!`); // "완두야!"
console.log(text`${"완삼"}아!`); // "완삼아!"

console.log(text`${"완두"}이야!`); // "완두야!"
console.log(text`${"완삼"}이야!`); // "완삼이야!"

// 모호한 케이스
console.log(text`${"완두"}야!`); // "완두야!"
console.log(text`${"완삼"}야!`); // "완삼이야!" // "완삼아!"를 원했지만 "이야/야" 규칙이 우선.
```

### 숫자 판단 및 영어

숫자의 경우 한국어 발음 기준으로 변환하여 제공합니다.

```typescript
console.log(text`정답은 ${"100"}과 같다.`); // 정답은 100과 같다.
console.log(text`정답은 ${"100"}와 같다.`); // 정답은 100과 같다.

console.log(text`정답은 ${"72"}과 같다.`); // 정답은 72와 같다.
console.log(text`정답은 ${"72"}와 같다.`); // 정답은 72와 같다.
```

영어 또한 한국어 발음 기준으로 변환하여 제공합니다.

```typescript
console.log(text`${"Apple"}는 코딩 합니다.`); // Apple은 코딩 합니다.
console.log(text`${"Apple"}은 코딩 합니다.`); // Apple은 코딩 합니다.

console.log(text`${"Banana"}는 코딩 합니다.`); // Banana는 코딩 합니다.
console.log(text`${"Banana"}은 코딩 합니다.`); // Banana는 코딩 합니다.
```

### 괄호 무시

괄호가 포함된 경우, 괄호안의 텍스트는 무시합니다.

```typescript
console.log(text`${"코코넛(바나나)"}은 코딩 합니다.`); // 코코넛(바나나)은 코딩 합니다.
console.log(text`${"코코넛(바나나)"}는 코딩 합니다.`); // 코코넛(바나나)은 코딩 합니다.
```

### Dedent

여러 줄의 문자열을 입력할 때, 들여쓰기를 제거해주는 기능을 제공합니다.

```typescript
function printResult(winner: string, loser: string) {
  return text`
    결과는 다음과 같습니다.

    - 승: ${winner}
    - 패: ${loser}

    ${winner}님 축하드립니다!
  `;
}
```

### 조사 변환 없이 그대로 사용하기

조사 변환없이 그대로 사용하려면 다음과 같이 사용하면 됩니다.

```typescript
console.log(text`${name}는 가나다라..`); // 이렇게 되면 '는'은 '은/는'으로 변환됩니다.

console.log(text`${name}{'는'} 가나다라..`); // 이렇게 되면 '는'은 변환 없이 그대로 출력됩니다.
```

## API

[API 문서 보기](https://deno.land/x/kokr/text/mod.ts)

## 함께 보면 좋아요

- [Hangul.js](https://github.com/e-/Hangul.js) 한글 문장의 자/모음을 분리하는
  라이브러리
- [inko](https://github.com/738/inko) 영타를 한글로, 혹은 한타를 영어로
  변환해주는 라이브러리
- [josa-complete](https://github.com/rycont/josa-complete) String.prototype을
  확장해서 조사를 깔끔하게 붙여주는 라이브러리
