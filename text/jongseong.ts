const RE_DIGIT_ZEROS = /[1-9](0+)$/;
const RE_ENG_LAST_TWO = /[a-z]{2}$/i;

const ㄱ = 1;
const ㄴ = 4;
const ㄹ = 8;
const ㅁ = 16;
const ㅂ = 17;
const ㅅ = 19;
const ㅇ = 21;

const digitZerosMap = [
  ㅂ, // 십
  ㄱ, // 백
  ㄴ, // 천
  ㄴ, // 만
  ㄴ, // 십만
  ㄴ, // 백만
  ㄴ, // 천만
  ㄱ, // 억
  ㄱ, // 십억
  ㄱ, // 백억
  ㄱ, // 천억
  0, // 조
  0, // 십조
  0, // 백조
  0, // 천조
  ㅇ, // 경
  ㅇ, // 십경
  ㅇ, // 백경
  ㅇ, // 천경
  0, // 해
  0, // 십해
  0, // 백해
  0, // 천해
];
const digitMap = [
  ㅇ, // 영
  ㄹ, // 일
  0, // 이
  ㅁ, // 삼
  0, // 사
  0, // 오
  ㄱ, // 육
  ㄹ, // 칠
  ㄹ, // 팔
  0, // 구
];

const engSuffix2Map: Record<string, number> = {
  nd: 0,
  ne: ㄴ,
  le: ㄹ,
  ng: ㅇ,
};

const engSuffixMap: Record<string, number> = {
  b: ㅂ,
  c: ㄱ,
  d: ㅅ,
  k: ㄱ,
  l: ㄹ,
  m: ㅁ,
  n: ㄴ,
  p: ㅂ,
  t: ㅅ,
};

const engCharMap: Record<string, number> = {
  l: ㄹ,
  m: ㅁ,
  n: ㄴ,
  r: ㄹ,
};

/** @internal */
export function jongseong(word: string): number {
  let w = word;
  while (w.length) {
    // strip paren ABC(D) => ABC
    w = w.replace(/\([^)]*\)$/, "");

    const last = w[w.length - 1];
    const lastCharCode = last.charCodeAt(0);

    if (lastCharCode >= 44032 && lastCharCode <= 55203) { // 가-힣
      return (lastCharCode - 44032) % 28;
    }

    // digit
    if (lastCharCode >= 48 && lastCharCode <= 57) { // 0-9
      const zerosMatch = RE_DIGIT_ZEROS.exec(w);
      if (zerosMatch) {
        return digitZerosMap[zerosMatch[1].length - 1] ?? 0;
      }
      return digitMap[lastCharCode - 48];
    }

    // english
    if (
      lastCharCode >= 65 && lastCharCode <= 90 ||
      lastCharCode >= 97 && lastCharCode <= 122
    ) {
      const match = RE_ENG_LAST_TWO.exec(w);
      if (match) {
        const suffix2 = match[0].toLowerCase();
        const code = engSuffix2Map[suffix2];
        if (typeof code === "number") {
          return code;
        }
        return engSuffixMap[suffix2[1]] || 0;
      }
      return engCharMap[last.toLowerCase()] ?? 0;
    }

    w = w.slice(0, w.length - 1);
  }

  return 0;
}
