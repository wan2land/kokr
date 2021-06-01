import { jongseong } from './jongseong'

const map: [search: string, allowed: number[], candidates: [string, string]][] = [
  ['이에요', [0], ['이에요', '에요']],
  ['예요', [0], ['예요', '에요']],
  ['에요', [0], ['이에요', '에요']],

  ['이었', [0], ['이었', '였']],
  ['으로', [0, 8], ['으로', '로']],
  ['이어', [0], ['이어', '여']],
  ['였', [0], ['이었', '였']],
  ['로', [0, 8], ['으로', '로']],
  ['여', [0], ['이어', '여']],
  ['은', [0], ['은', '는']],
  ['는', [0], ['은', '는']],
  ['이', [0], ['이', '가']],
  ['가', [0], ['이', '가']],
  ['을', [0], ['을', '를']],
  ['를', [0], ['을', '를']],
  ['과', [0], ['과', '와']],
  ['와', [0], ['과', '와']],
  ['아', [0], ['아', '야']],
  ['야', [0], ['아', '야']],
]

export function text(strings: TemplateStringsArray, ...interpolation: any[]): string {
  return strings.reduce((carry: string, string: string, index: number) => {
    const word = String(interpolation[index - 1])
    const result = map.find(([start]) => string.startsWith(start))
    if (result) {
      const [match, allowed, candidates] = result
      return `${carry}${word}${allowed.includes(jongseong(word)) ? candidates[1] : candidates[0]}${string.slice(match.length)}`
    }
    return `${carry}${word}${string}`
  })
}
