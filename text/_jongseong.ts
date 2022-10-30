const RE_DIGIT_ZEROS = /[1-9](0+)$/;
const RE_ENG_LAST2 = /[a-z]{2}$/i;
const codeForZeros = [
  17,
  1,
  4,
  4,
  4,
  4,
  4,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  21,
  21,
  21,
  21,
  0,
  0,
  0,
  0,
];
const codeForDigit = [21, 8, 0, 16, 0, 0, 1, 8, 8, 0];

const codeForEng2: Record<string, number> = {
  ck: 1,
  ne: 4,
  le: 8,
  ob: 17,
  et: 19,
  ng: 21,
};

const codeForEng1: Record<string, number> = {
  n: 4,
  l: 8,
  m: 16,
  p: 17,
};

const codeForEngSingle: Record<string, number> = {
  l: 8,
  r: 8,
  m: 16,
  n: 4,
};

export function jongseong(word: string): number {
  let w = word;
  while (w.length) {
    w = w.replace(/\([^)]*\)$/, ""); // ABC(D) => A

    const last = w[w.length - 1];
    const lastCharCode = last.charCodeAt(0);

    if (lastCharCode >= 44032 && lastCharCode <= 55203) { // 가-힣
      return (lastCharCode - 44032) % 28;
    }

    if (lastCharCode >= 48 && lastCharCode <= 57) { // 0-9
      const zerosMatch = RE_DIGIT_ZEROS.exec(w);
      if (zerosMatch) {
        const code = codeForZeros[zerosMatch[1].length - 1];
        if (typeof code === "number") {
          return code;
        }
        throw new Error(`too large number(${zerosMatch[0]}).`);
      }
      return codeForDigit[lastCharCode - 48];
    }

    if (
      lastCharCode >= 65 && lastCharCode <= 90 ||
      lastCharCode >= 97 && lastCharCode <= 122
    ) {
      const match = RE_ENG_LAST2.exec(w);
      if (match) {
        const word2 = match[0].toLowerCase();
        const code = codeForEng2[word2];
        if (typeof code === "number") {
          return code;
        }
        return codeForEng1[word2[1]] || 0;
      }
      return codeForEngSingle[last.toLowerCase()] || 0;
    }

    w = w.slice(0, w.length - 1);
  }

  return 0;
}
