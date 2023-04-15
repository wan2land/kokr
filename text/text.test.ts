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

Deno.test("@kokr/text, text 와/과", () => {
  assertEquals(text`${"완두"}와 코딩을 했습니다.`, "완두와 코딩을 했습니다.");
  assertEquals(text`${"완두"}과 코딩을 했습니다.`, "완두와 코딩을 했습니다.");

  assertEquals(text`${"완삼"}와 코딩을 했습니다.`, "완삼과 코딩을 했습니다.");
  assertEquals(text`${"완삼"}과 코딩을 했습니다.`, "완삼과 코딩을 했습니다.");
});

Deno.test("@kokr/text, text 아/야", () => {
  assertEquals(text`${"완두"}아!`, "완두야!");
  assertEquals(text`${"완두"}야!`, "완두야!");

  assertEquals(text`${"완삼"}아!`, "완삼아!");
  assertEquals(text`${"완삼"}야!`, "완삼아!");
});

Deno.test("@kokr/text, text 이랑/랑", () => {
  assertEquals(text`${"완두"}이랑!`, "완두랑!");
  assertEquals(text`${"완두"}랑!`, "완두랑!");

  assertEquals(text`${"완삼"}이랑!`, "완삼이랑!");
  assertEquals(text`${"완삼"}랑!`, "완삼이랑!");
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

Deno.test("@kokr/text, text 으로/로", () => {
  assertEquals(text`${"대구"}으로 갑시다.`, "대구로 갑시다.");
  assertEquals(text`${"대구"}로 갑시다.`, "대구로 갑시다.");

  assertEquals(text`${"부산"}으로 갑시다.`, "부산으로 갑시다.");
  assertEquals(text`${"부산"}로 갑시다.`, "부산으로 갑시다.");

  // ㄹ 탈락
  assertEquals(text`${"서울"}으로 갑시다.`, "서울로 갑시다.");
  assertEquals(text`${"서울"}로 갑시다.`, "서울로 갑시다.");
});

Deno.test("@kokr/text, text 이시여/시여", () => {
  assertEquals(text`${"완두"}이시여!`, "완두시여!");
  assertEquals(text`${"완두"}시여!`, "완두시여!");

  assertEquals(text`${"완삼"}이시여!`, "완삼이시여!");
  assertEquals(text`${"완삼"}시여!`, "완삼이시여!");
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
