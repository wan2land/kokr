
const { hasJongseong, code } = require('jongseong') as { hasJongseong(text: string): boolean, code(text: string): number } // eslint-disable-line @typescript-eslint/no-require-imports

function roeuro(text: string): boolean {
  if (code(text) === 8) {
    return false
  }
  return hasJongseong(text)
}

const map: [string, (text: string) => boolean, [string, string]][] = [
  ['이에요', hasJongseong, ['이에요', '예요']],
  ['예요', hasJongseong, ['이에요', '예요']],
  ['이었', hasJongseong, ['이었', '였']],
  ['으로', roeuro, ['으로', '로']],
  ['이어', hasJongseong, ['이어', '여']],
  ['였', hasJongseong, ['이었', '였']],
  ['로', roeuro, ['으로', '로']],
  ['여', hasJongseong, ['이어', '여']],
  ['은', hasJongseong, ['은', '는']],
  ['는', hasJongseong, ['은', '는']],
  ['이', hasJongseong, ['이', '가']],
  ['가', hasJongseong, ['이', '가']],
  ['을', hasJongseong, ['을', '를']],
  ['를', hasJongseong, ['을', '를']],
  ['과', hasJongseong, ['과', '와']],
  ['와', hasJongseong, ['과', '와']],
  ['아', hasJongseong, ['아', '야']],
  ['야', hasJongseong, ['아', '야']],
]

export function text(strings: TemplateStringsArray, ...interpolation: any[]): string {
  const elements = [strings[0]]
  const stringsLength = strings.length
  for (let i = 1; i < stringsLength; i++) {
    const word = String(interpolation[i - 1])
    elements.push(word)
    const suffix = strings[i]
    const result = map.find(([start]) => suffix.startsWith(start))
    if (result) {
      const [match, validate, candidates] = result
      elements.push(`${validate(word) ? candidates[0] : candidates[1]}${suffix.slice(match.length)}`)
    } else {
      elements.push(suffix)
    }
  }
  return elements.join('')
}
