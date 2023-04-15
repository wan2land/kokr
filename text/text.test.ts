import { assertEquals } from "testing/asserts.ts";
import { text } from "./text.ts";

Deno.test("@kokr/text, text empty", () => {
  assertEquals(text``, "");
});

Deno.test("@kokr/text, text 은/는", () => {
  assertEquals(text`${"완두"}는 코딩을 합니다.`, "완두는 코딩을 합니다.");
  assertEquals(text`${"완두"}은 코딩을 합니다.`, "완두는 코딩을 합니다.");

  assertEquals(text`${"완삼"}는 코딩을 합니다.`, "완삼은 코딩을 합니다.");
  assertEquals(text`${"완삼"}은 코딩을 합니다.`, "완삼은 코딩을 합니다.");
});

Deno.test("@kokr/text, text 이/가", () => {
  assertEquals(text`${"완두"}가 코딩을 했습니다.`, "완두가 코딩을 했습니다.");
  assertEquals(text`${"완두"}이 코딩을 했습니다.`, "완두가 코딩을 했습니다.");

  assertEquals(text`${"완삼"}가 코딩을 했습니다.`, "완삼이 코딩을 했습니다.");
  assertEquals(text`${"완삼"}이 코딩을 했습니다.`, "완삼이 코딩을 했습니다.");
});

Deno.test("@kokr/text, text 을/를", () => {
  assertEquals(text`${"완두"}을 가르쳤습니다.`, "완두를 가르쳤습니다.");
  assertEquals(text`${"완두"}를 가르쳤습니다.`, "완두를 가르쳤습니다.");

  assertEquals(text`${"완삼"}을 가르쳤습니다.`, "완삼을 가르쳤습니다.");
  assertEquals(text`${"완삼"}를 가르쳤습니다.`, "완삼을 가르쳤습니다.");
});

Deno.test("@kokr/text, text 과/와", () => {
  assertEquals(text`${"완두"}과 코딩을 했습니다.`, "완두와 코딩을 했습니다.");
  assertEquals(text`${"완두"}와 코딩을 했습니다.`, "완두와 코딩을 했습니다.");

  assertEquals(text`${"완삼"}과 코딩을 했습니다.`, "완삼과 코딩을 했습니다.");
  assertEquals(text`${"완삼"}와 코딩을 했습니다.`, "완삼과 코딩을 했습니다.");
});

Deno.test("@kokr/text, text 아/야", () => {
  assertEquals(text`${"완두"}아!`, "완두야!");
  assertEquals(text`${"완두"}야!`, "완두야!");

  assertEquals(text`${"완삼"}아!`, "완삼아!");
  // assertEquals(text`${"완삼"}야!`, "완삼아!"); -> 이야/야 규칙이 우선
});

// 2글자 가나다순

Deno.test("@kokr/text, text 이나/나", () => {
  assertEquals(text`${"완두"}이나..`, "완두나..");
  assertEquals(text`${"완두"}나..`, "완두나..");

  assertEquals(text`${"완삼"}이나..`, "완삼이나..");
  assertEquals(text`${"완삼"}나..`, "완삼이나..");
});

Deno.test("@kokr/text, text 이다/다", () => {
  assertEquals(text`${"완두"}이다!!`, "완두다!!");
  assertEquals(text`${"완두"}다!!`, "완두다!!");

  assertEquals(text`${"완삼"}이다!!`, "완삼이다!!");
  assertEquals(text`${"완삼"}다!!`, "완삼이다!!");
});

Deno.test("@kokr/text, text 이든/든", () => {
  assertEquals(text`${"완두"}이든..`, "완두든..");
  assertEquals(text`${"완두"}든..`, "완두든..");

  assertEquals(text`${"완삼"}이든..`, "완삼이든..");
  assertEquals(text`${"완삼"}든..`, "완삼이든..");
});

Deno.test("@kokr/text, text 이라/라", () => {
  assertEquals(text`${"완두"}이라니!!`, "완두라니!!");
  assertEquals(text`${"완두"}라니!!`, "완두라니!!");

  assertEquals(text`${"완삼"}이라니!!`, "완삼이라니!!");
  assertEquals(text`${"완삼"}라니!!`, "완삼이라니!!");
});

Deno.test("@kokr/text, text 이란/란", () => {
  assertEquals(text`${"완두"}이란..`, "완두란..");
  assertEquals(text`${"완두"}란..`, "완두란..");

  assertEquals(text`${"완삼"}이란..`, "완삼이란..");
  assertEquals(text`${"완삼"}란..`, "완삼이란..");
});

Deno.test("@kokr/text, text 이랑/랑", () => {
  assertEquals(text`${"완두"}이랑!`, "완두랑!");
  assertEquals(text`${"완두"}랑!`, "완두랑!");

  assertEquals(text`${"완삼"}이랑!`, "완삼이랑!");
  assertEquals(text`${"완삼"}랑!`, "완삼이랑!");
});

Deno.test("@kokr/text, text 으로/로", () => {
  assertEquals(text`${"대구"}으로 갑시다.`, "대구로 갑시다.");
  assertEquals(text`${"대구"}로 갑시다.`, "대구로 갑시다.");

  assertEquals(text`${"부산"}으로 갑시다.`, "부산으로 갑시다.");
  assertEquals(text`${"부산"}로 갑시다.`, "부산으로 갑시다.");

  // ㄹ 탈락
  assertEquals(text`${"서울"}으로 갑시다.`, "서울로 갑시다.");
  assertEquals(text`${"서울"}로 갑시다.`, "서울로 갑시다.");
});

Deno.test("@kokr/text, text 이며/며", () => {
  assertEquals(text`${"완두"}이며,`, "완두며,");
  assertEquals(text`${"완두"}며,`, "완두며,");

  assertEquals(text`${"완삼"}이며,`, "완삼이며,");
  assertEquals(text`${"완삼"}며,`, "완삼이며,");
});

Deno.test("@kokr/text, text 이셨/셨", () => {
  assertEquals(text`${"완두"}이셨어!`, "완두셨어!");
  assertEquals(text`${"완두"}셨어!`, "완두셨어!");

  assertEquals(text`${"완삼"}이셨어!`, "완삼이셨어!");
  assertEquals(text`${"완삼"}셨어!`, "완삼이셨어!");

  assertEquals(text`${"완두"}이셨구나!`, "완두셨구나!");
  assertEquals(text`${"완두"}셨구나!`, "완두셨구나!");

  assertEquals(text`${"완삼"}이셨구나!`, "완삼이셨구나!");
  assertEquals(text`${"완삼"}셨구나!`, "완삼이셨구나!");
});

Deno.test("@kokr/text, text 이시/시", () => {
  assertEquals(text`${"완두"}이시여!`, "완두시여!");
  assertEquals(text`${"완두"}시여!`, "완두시여!");

  assertEquals(text`${"완삼"}이시여!`, "완삼이시여!");
  assertEquals(text`${"완삼"}시여!`, "완삼이시여!");

  assertEquals(text`${"완두"}이시구나!`, "완두시구나!");
  assertEquals(text`${"완두"}시구나!`, "완두시구나!");

  assertEquals(text`${"완삼"}이시구나!`, "완삼이시구나!");
  assertEquals(text`${"완삼"}시구나!`, "완삼이시구나!");
});

Deno.test("@kokr/text, text 이야/야", () => {
  assertEquals(text`역시, ${"완두"}이야!`, "역시, 완두야!");
  assertEquals(text`역시, ${"완두"}야!`, "역시, 완두야!");

  assertEquals(text`역시, ${"완삼"}이야!`, "역시, 완삼이야!");
  assertEquals(text`역시, ${"완삼"}야!`, "역시, 완삼이야!");
});

Deno.test("@kokr/text, text 이여/여", () => {
  assertEquals(text`${"완두"}이여!`, "완두여!");
  assertEquals(text`${"완두"}여!`, "완두여!");

  assertEquals(text`${"완삼"}이여!`, "완삼이여!");
  assertEquals(text`${"완삼"}여!`, "완삼이여!");
});

Deno.test("@kokr/text, text 이었/였", () => {
  assertEquals(text`${"완두"}이었어요.`, "완두였어요.");
  assertEquals(text`${"완두"}였어요.`, "완두였어요.");

  assertEquals(text`${"완삼"}이었어요.`, "완삼이었어요.");
  assertEquals(text`${"완삼"}였어요.`, "완삼이었어요.");
});

// 3글자
Deno.test("@kokr/text, text 이어요/여요", () => {
  assertEquals(text`${"완두"}이어요.`, "완두여요.");
  assertEquals(text`${"완두"}여요.`, "완두여요.");

  assertEquals(text`${"완삼"}이어요.`, "완삼이어요.");
  assertEquals(text`${"완삼"}여요.`, "완삼이어요.");
});

Deno.test("@kokr/text, text 이에요/예요", () => {
  assertEquals(text`${"완두"}이에요.`, "완두예요.");
  assertEquals(text`${"완두"}예요.`, "완두예요.");

  assertEquals(text`${"완삼"}이에요.`, "완삼이에요.");
  assertEquals(text`${"완삼"}예요.`, "완삼이에요.");
});

Deno.test("@kokr/text, text digit", () => {
  assertEquals(text`정답은 ${"100"}과 같다.`, "정답은 100과 같다.");
  assertEquals(text`정답은 ${"100"}와 같다.`, "정답은 100과 같다.");

  assertEquals(text`정답은 ${"72"}과 같다.`, "정답은 72와 같다.");
  assertEquals(text`정답은 ${"72"}와 같다.`, "정답은 72와 같다.");
});

Deno.test("@kokr/text, text english words", () => {
  assertEquals(text`${"Apple"}는 코딩 합니다.`, "Apple은 코딩 합니다.");
  assertEquals(text`${"Apple"}은 코딩 합니다.`, "Apple은 코딩 합니다.");

  assertEquals(text`${"Banana"}는 코딩 합니다.`, "Banana는 코딩 합니다.");
  assertEquals(text`${"Banana"}은 코딩 합니다.`, "Banana는 코딩 합니다.");
});

Deno.test("@kokr/text, dedent", () => {
  function printResult(winner: string, loser: string) {
    return text`
      결과는 다음과 같습니다.

      - 승: ${winner}
      - 패: ${loser}

      ${winner}님 축하드립니다!
    `;
  }

  assertEquals(
    printResult("완두", "완삼"),
    "결과는 다음과 같습니다.\n\n- 승: 완두\n- 패: 완삼\n\n완두님 축하드립니다!",
  );
});
