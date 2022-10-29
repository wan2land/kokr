# koKR - text

## 설치방법

```bash
npm install @kokr/text
```

```typescript
import text from "@kokr/text";

let name1 = "완두";
let name2 = "완삼";

// 은/는
console.log(text`${name1}는 코딩 합니다.`); // 완두는 코딩 합니다.
console.log(text`${name1}은 코딩 합니다.`); // 완두는 코딩 합니다.
console.log(text`${name2}는 코딩 합니다.`); // 완삼은 코딩 합니다.
console.log(text`${name2}은 코딩 합니다.`); // 완삼은 코딩 합니다.

// 이/가
console.log(text`${name1}가 코딩 했습니다.`); // 완두가 코딩 했습니다.
console.log(text`${name1}이 코딩 했습니다.`); // 완두가 코딩 했습니다.
console.log(text`${name2}가 코딩 했습니다.`); // 완삼이 코딩 했습니다.
console.log(text`${name2}이 코딩 했습니다.`); // 완삼이 코딩 했습니다.

// 을/를
console.log(text`${name1}을 가르쳤습니다.`); // 완두를 가르쳤습니다.
console.log(text`${name1}를 가르쳤습니다.`); // 완두를 가르쳤습니다.
console.log(text`${name2}을 가르쳤습니다.`); // 완삼을 가르쳤습니다.
console.log(text`${name2}를 가르쳤습니다.`); // 완삼을 가르쳤습니다.

// 와/과
console.log(text`${name1}와 코딩을 했습니다.`); // 완두와 코딩을 했습니다.
console.log(text`${name1}과 코딩을 했습니다.`); // 완두와 코딩을 했습니다.
console.log(text`${name2}와 코딩을 했습니다.`); // 완삼과 코딩을 했습니다.
console.log(text`${name2}과 코딩을 했습니다.`); // 완삼과 코딩을 했습니다.

// 아/야
console.log(text`${name1}아!`); // 완두야!
console.log(text`${name1}야!`); // 완두야!
console.log(text`${name2}아!`); // 완삼아!
console.log(text`${name2}야!`); // 완삼아!

// 이었/였
console.log(text`${name1}이었어요.`); // 완두였어요.
console.log(text`${name1}였어요.`); // 완두였어요.
console.log(text`${name2}이었어요.`); // 완삼이었어요.
console.log(text`${name2}였어요.`); // 완삼이었어요.

// 이에요/예요
console.log(text`${name1}이에요.`); // 완두예요.
console.log(text`${name1}예요.`); // 완두예요.
console.log(text`${name2}이에요.`); // 완삼이에요.
console.log(text`${name2}예요.`); // 완삼이에요.

// 이어요/여요
console.log(text`${name1}이어요.`); // 완두여요.
console.log(text`${name1}여요.`); // 완두여요.
console.log(text`${name2}이어요.`); // 완삼이어요.
console.log(text`${name2}여요.`); // 완삼이어요.

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
