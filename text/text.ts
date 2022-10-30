import { jongseong } from "./_jongseong.ts";

const map: [search: string, allowed: number[], candidates: [string, string]][] =
  [
    ["이에요", [0], ["이에요", "에요"]],
    ["예요", [0], ["예요", "에요"]],
    ["에요", [0], ["이에요", "에요"]],

    ["이었", [0], ["이었", "였"]],
    ["으로", [0, 8], ["으로", "로"]],
    ["이어", [0], ["이어", "여"]],
    ["였", [0], ["이었", "였"]],
    ["로", [0, 8], ["으로", "로"]],
    ["여", [0], ["이어", "여"]],
    ["은", [0], ["은", "는"]],
    ["는", [0], ["은", "는"]],
    ["이", [0], ["이", "가"]],
    ["가", [0], ["이", "가"]],
    ["을", [0], ["을", "를"]],
    ["를", [0], ["을", "를"]],
    ["과", [0], ["과", "와"]],
    ["와", [0], ["과", "와"]],
    ["아", [0], ["아", "야"]],
    ["야", [0], ["아", "야"]],
  ];

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
  return strings.reduce((carry: string, string: string, index: number) => {
    const word = String(interpolation[index - 1]);
    const result = map.find(([start]) => string.startsWith(start));
    if (result) {
      const [match, allowed, candidates] = result;
      return `${carry}${word}${
        allowed.includes(jongseong(word)) ? candidates[1] : candidates[0]
      }${string.slice(match.length)}`;
    }
    return `${carry}${word}${string}`;
  });
}
