const RE_DIGIT_ZEROS = /[1-9](0+)$/;
const RE_ENG_LAST_TWO = /[a-z]{2}$/i;

const enum Jongseong {
  ㄱ = 1,
  ㄴ = 4,
  ㄹ = 8,
  ㅁ = 16,
  ㅂ = 17,
  ㅅ = 19,
  ㅇ = 21,
}

const digitZerosMap = [
  Jongseong.ㅂ, // 십
  Jongseong.ㄱ, // 백
  Jongseong.ㄴ, // 천
  Jongseong.ㄴ, // 만
  Jongseong.ㄴ, // 십만
  Jongseong.ㄴ, // 백만
  Jongseong.ㄴ, // 천만
  Jongseong.ㄱ, // 억
  Jongseong.ㄱ, // 십억
  Jongseong.ㄱ, // 백억
  Jongseong.ㄱ, // 천억
  0, // 조
  0, // 십조
  0, // 백조
  0, // 천조
  Jongseong.ㅇ, // 경
  Jongseong.ㅇ, // 십경
  Jongseong.ㅇ, // 백경
  Jongseong.ㅇ, // 천경
  0, // 해
  0, // 십해
  0, // 백해
  0, // 천해
];
const digitMap = [
  Jongseong.ㅇ, // 영
  Jongseong.ㄹ, // 일
  0, // 이
  Jongseong.ㅁ, // 삼
  0, // 사
  0, // 오
  Jongseong.ㄱ, // 육
  Jongseong.ㄹ, // 칠
  Jongseong.ㄹ, // 팔
  0, // 구
];

const engSuffix2Map: Record<string, number> = {
  nd: 0,
  ne: Jongseong.ㄴ,
  le: Jongseong.ㄹ,
  ng: Jongseong.ㅇ,
};

const engSuffixMap: Record<string, number> = {
  b: Jongseong.ㅂ,
  c: Jongseong.ㄱ,
  d: Jongseong.ㅅ,
  k: Jongseong.ㄱ,
  l: Jongseong.ㄹ,
  m: Jongseong.ㅁ,
  n: Jongseong.ㄴ,
  p: Jongseong.ㅂ,
  t: Jongseong.ㅅ,
};

const engCharMap: Record<string, number> = {
  l: Jongseong.ㄹ,
  m: Jongseong.ㅁ,
  n: Jongseong.ㄴ,
  r: Jongseong.ㄹ,
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
