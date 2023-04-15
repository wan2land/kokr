import { assertEquals } from "testing/asserts.ts";
import { jongseong } from "./jongseong.ts";

Deno.test("@kokr/text, jongseong hangul", () => {
  assertEquals(jongseong("가(각)"), 0); // ignore paren

  assertEquals(jongseong("가"), 0);
  assertEquals(jongseong("납"), 17);
  assertEquals(jongseong("닿"), 27);
  assertEquals(jongseong("힣"), 27);
});

Deno.test("@kokr/text, jongseong number", () => {
  assertEquals(jongseong("0"), jongseong("영"));
  assertEquals(jongseong("1"), jongseong("일"));
  assertEquals(jongseong("2"), jongseong("이"));
  assertEquals(jongseong("3"), jongseong("삼"));
  assertEquals(jongseong("4"), jongseong("사"));
  assertEquals(jongseong("5"), jongseong("오"));
  assertEquals(jongseong("6"), jongseong("육"));
  assertEquals(jongseong("7"), jongseong("칠"));
  assertEquals(jongseong("8"), jongseong("팔"));
  assertEquals(jongseong("9"), jongseong("구"));

  assertEquals(jongseong("00"), jongseong("영"));
});

Deno.test("@kokr/text, jongseong number with zeros", () => {
  assertEquals(jongseong("10"), jongseong("십"));
  assertEquals(jongseong("100"), jongseong("백"));
  assertEquals(jongseong("1000"), jongseong("천"));
  assertEquals(jongseong("10000"), jongseong("만"));
  assertEquals(jongseong("100000000"), jongseong("억"));
  assertEquals(jongseong("1000000000000"), jongseong("조"));
  assertEquals(jongseong("10000000000000000"), jongseong("경"));
  assertEquals(jongseong("100000000000000000000"), jongseong("해"));
});

Deno.test("@kokr/text, jongseong english word", () => {
  assertEquals(jongseong("job"), jongseong("잡"));
  assertEquals(jongseong("public"), jongseong("퍼블릭"));
  assertEquals(jongseong("good"), jongseong("굿"));
  assertEquals(jongseong("check"), jongseong("첵"));
  assertEquals(jongseong("signal"), jongseong("시그널"));
  assertEquals(jongseong("bottom"), jongseong("바텀"));
  assertEquals(jongseong("vision"), jongseong("비전"));
  assertEquals(jongseong("group"), jongseong("그룹"));
  assertEquals(jongseong("yet"), jongseong("옛"));

  assertEquals(jongseong("fine"), jongseong("파인"));
  assertEquals(jongseong("scale"), jongseong("스케일"));
  assertEquals(jongseong("song"), jongseong("송"));

  assertEquals(jongseong("coffee"), jongseong("커피"));
});

Deno.test("@kokr/text, jongseong english character", () => {
  assertEquals(jongseong("l"), jongseong("엘"));
  assertEquals(jongseong("r"), jongseong("알"));
  assertEquals(jongseong("m"), jongseong("엠"));
  assertEquals(jongseong("n"), jongseong("엔"));
  assertEquals(jongseong("x"), jongseong("엑스"));

  assertEquals(jongseong("L"), jongseong("엘"));
  assertEquals(jongseong("R"), jongseong("알"));
  assertEquals(jongseong("M"), jongseong("엠"));
  assertEquals(jongseong("N"), jongseong("엔"));
  assertEquals(jongseong("X"), jongseong("엑스"));
});

Deno.test("@kokr/text, jongseong random word", () => {
  assertEquals(jongseong("서울"), 8);
  assertEquals(jongseong("서울 "), 8);
  assertEquals(jongseong("서울!"), 8);

  assertEquals(jongseong("완두"), 0);
  assertEquals(jongseong("완두 "), 0);
  assertEquals(jongseong("완두!!!"), 0);

  assertEquals(jongseong("!@#"), 0);
});
