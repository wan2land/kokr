# ko_KR - text

## 설치방법

```bash
npm install @ko_kr/text
```

```typescript
import text from '@ko_kr/text'

let name = '완두'

// 은/는
console.log(text`${name}는 코딩을 합니다.`) // 완두는 코딩을 합니다.
console.log(text`${name}은 코딩을 합니다.`) // 완두는 코딩을 합니다.

// 이/가
console.log(text`${name}가 코딩을 했습니다.`) // 완두가 코딩을 했습니다.
console.log(text`${name}이 코딩을 했습니다.`) // 완두가 코딩을 했습니다.

// 을/를
console.log(text`${name}을 가르쳤습니다.`) // 완두를 가르쳤습니다.
console.log(text`${name}를 가르쳤습니다.`) // 완두를 가르쳤습니다.

// 와/과
console.log(text`${name}와 코딩을 했습니다.`) // 완두와 코딩을 했습니다.
console.log(text`${name}과 코딩을 했습니다.`) // 완두와 코딩을 했습니다.

// 아/야
console.log(text`${name}아!`) // 완두야!
console.log(text`${name}야!`) // 완두야!

// 이어요/여요
console.log(text`${name}이어요.`) // 완두여요.
console.log(text`${name}여요.`) // 완두여요.

// 이었/였
console.log(text`${name}이었어요.`) // 완두였어요.
console.log(text`${name}였어요.`) // 완두였어요.

// 이에요/예요
console.log(text`${name}이에요.`) // 완두예요.
console.log(text`${name}예요.`) // 완두예요.

// 로/으로
let place = '대구'
console.log(text`${place}으로 갑시다.`) // 대구로 갑시다.
console.log(text`${place}로 갑시다.`) // 대구로 갑시다.

place = '부산'
console.log(text`${place}으로 갑시다.`) // 부산으로 갑시다.
console.log(text`${place}로 갑시다.`) // 부산으로 갑시다.

place = '서울' // 예외케이스
console.log(text`${place}으로 갑시다.`) // 서울로 갑시다.
console.log(text`${place}로 갑시다.`) // 서울로 갑시다.
```
