import { jongseong } from "./jongseong.ts";

const allowWithoutJongseong = new Set([0]);
const allowWithLieul = new Set([0, 8]);
const patterns: [allowed: Set<number>, valid: string, invalid: string][] = [
  [allowWithoutJongseong, "이어요", "여요"],
  [allowWithoutJongseong, "이에요", "예요"],
  [allowWithLieul, "으로", "로"],
  [allowWithoutJongseong, "이었", "였"],
  [allowWithoutJongseong, "이여", "여"],
  [allowWithoutJongseong, "이랑", "랑"],
  [allowWithoutJongseong, "은", "는"],
  [allowWithoutJongseong, "이", "가"],
  [allowWithoutJongseong, "을", "를"],
  [allowWithoutJongseong, "과", "와"],
  [allowWithoutJongseong, "아", "야"],
];

const detectPattern = patterns.map(([_, valid, invalid]) => {
  return `(${valid}|${invalid})`;
}).join("|");
const RE_DETECT = new RegExp(`^(?:${detectPattern})`);

/**
 * @example
 * let userName = "완두";
 *
 * // 은/는
 * text`${userName}는 코딩 합니다.` // 완두는 코딩 합니다.
 * text`${userName}은 코딩 합니다.` // 완두는 코딩 합니다.
 *
 * // 이/가
 * text`${userName}가 코딩 했습니다.` // 완두가 코딩 했습니다.
 * text`${userName}이 코딩 했습니다.` // 완두가 코딩 했습니다.
 *
 * // 을/를
 * text`${userName}을 가르쳤습니다.` // 완두를 가르쳤습니다.
 * text`${userName}를 가르쳤습니다.` // 완두를 가르쳤습니다.
 *
 * // 와/과
 * text`${userName}와 코딩을 했습니다.` // 완두와 코딩을 했습니다.
 * text`${userName}과 코딩을 했습니다.` // 완두와 코딩을 했습니다.
 *
 * // 아/야
 * text`${userName}아!` // 완두야!
 * text`${userName}야!` // 완두야!
 *
 * // 이었/였
 * text`${userName}이었어요.` // 완두였어요.
 * text`${userName}였어요.` // 완두였어요.
 *
 * // 이에요/예요
 * text`${userName}이에요.` // 완두예요.
 * text`${userName}예요.` // 완두예요.
 *
 * // 이어요/여요
 * text`${userName}이어요.` // 완두여요.
 * text`${userName}여요.` // 완두여요.
 *
 * // 로/으로
 * let place = "대구";
 * text`${place}으로 갑시다.` // 대구로 갑시다.
 * text`${place}로 갑시다.` // 대구로 갑시다.
 *
 * place = "부산";
 * text`${place}으로 갑시다.` // 부산으로 갑시다.
 * text`${place}로 갑시다.` // 부산으로 갑시다.
 *
 * place = "서울"; // ㄹ로 끝나는 경우
 * text`${place}으로 갑시다.` // 서울로 갑시다.
 * text`${place}로 갑시다.` // 서울로 갑시다.
 */
export function text(
  strings: TemplateStringsArray,
  ...interpolation: unknown[]
): string {
  return dedent(strings.reduce(
    (acc: string, string: string, index: number) => {
      string = string.normalize(); // normalize NFC
      const word = String(interpolation[index - 1]).normalize(); // normalize NFC

      const matched = string.match(RE_DETECT);
      if (matched) {
        const [allowed, valid, invalid] =
          patterns[[...matched].slice(1).findIndex((v) => v)];

        const josa = allowed.has(jongseong(word)) ? invalid : valid;
        const remain = string.slice(matched[0].length);
        return `${acc}${word}${josa}${remain}`;
      }
      return `${acc}${word}${string}`;
    },
  ));
}

/** @internal */
function dedent(text: string) {
  const lines = text.split("\n");
  let min: number | undefined;
  for (const line of lines) {
    const m = line.match(/^(\s+)\S+/);
    if (m) {
      const indent = m[1].length;
      if (!min) {
        min = indent;
      } else {
        min = Math.min(min, indent);
      }
    }
  }

  if (typeof min === "number") {
    return lines.map((l) => l[0] === " " ? l.slice(min) : l).join("\n").trim();
  }

  return text.trim();
}
