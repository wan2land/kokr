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

Deno.test("@kokr/text, text 이어/여", () => {
  assertEquals(text`${"완두"}이어요.`, "완두여요.");
  assertEquals(text`${"완두"}여요.`, "완두여요.");

  assertEquals(text`${"완삼"}이어요.`, "완삼이어요.");
  assertEquals(text`${"완삼"}여요.`, "완삼이어요.");
});

Deno.test("@kokr/text, text 이었/였", () => {
  assertEquals(text`${"완두"}이었어요.`, "완두였어요.");
  assertEquals(text`${"완두"}였어요.`, "완두였어요.");

  assertEquals(text`${"완삼"}이었어요.`, "완삼이었어요.");
  assertEquals(text`${"완삼"}였어요.`, "완삼이었어요.");
});

Deno.test("@kokr/text, text 이에요/에요/예요", () => {
  assertEquals(text`${"완두"}이에요.`, "완두에요.");
  assertEquals(text`${"완두"}에요.`, "완두에요.");
  assertEquals(text`${"완두"}예요.`, "완두에요.");

  assertEquals(text`${"완삼"}이에요.`, "완삼이에요.");
  assertEquals(text`${"완삼"}에요.`, "완삼이에요.");
  assertEquals(text`${"완삼"}예요.`, "완삼예요.");
});

Deno.test("@kokr/text, text 으로/로", () => {
  assertEquals(text`${"대구"}으로 갑시다.`, "대구로 갑시다.");
  assertEquals(text`${"대구"}로 갑시다.`, "대구로 갑시다.");

  assertEquals(text`${"부산"}으로 갑시다.`, "부산으로 갑시다.");
  assertEquals(text`${"부산"}로 갑시다.`, "부산으로 갑시다.");

  // exception case
  assertEquals(text`${"서울"}으로 갑시다.`, "서울로 갑시다.");
  assertEquals(text`${"서울"}로 갑시다.`, "서울로 갑시다.");
});
