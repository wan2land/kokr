
const codeMap: Record<number, [foreign: boolean, year: number]> = {
  1: [false, 1900],
  2: [false, 1900],
  3: [false, 2000],
  4: [false, 2000],
  5: [true, 1900],
  6: [true, 1900],
  7: [true, 2000],
  8: [true, 2000],
  9: [false, 1800],
  0: [false, 1800],
}

function sanitizeDate(year: number, month: number, date: number): string | undefined {
  if (year < 1800 || year > 2099 || month < 1 || month > 12 || date < 1 || date > 31) {
    return
  }
  const d = new Date()
  d.setFullYear(year)
  d.setMonth(month - 1)
  d.setDate(date)
  if (d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === date) {
    return `${year}-${`${month}`.padStart(2, '0')}-${`${date}`.padStart(2, '0')}`
  }
  return undefined
}

function findParity(n: number[], isForeign?: boolean): number | undefined {
  if (n.length !== 13) {
    return
  }

  let parity = (11 - Array.from({ length: 12 }).reduce<number>((carry, _, i) => carry + n[i] * (i % 8 + 2), 0) % 11) % 10
  if (!isForeign) {
    return parity
  }

  parity = (parity + 2) % 10
  return parity
}

export interface AnalyzeOptions {
  now?: Date | number | string
}

export interface AnalyzeResult {
  valid: boolean
  parity: number | null
  gender: 'M' | 'F' | null
  foreigner: boolean | null
  birth: string | null
  age: number | null
  krAge: number | null
}

export function analyze(id: string, options: AnalyzeOptions = {}): AnalyzeResult {
  id = id.replace(/[^\d]/g, '')
  const n = id.split('').map(n => +n)

  let birth: string | undefined
  let gender: 'M' | 'F' | undefined
  let foreigner: boolean | undefined
  let age: number | undefined
  let krAge: number | undefined

  if (typeof n[6] === 'number') {
    gender = n[6] % 2 === 1 ? 'M' : 'F'

    let yearPrefix: number
    [foreigner, yearPrefix] = codeMap[n[6]]
    const birthYear = yearPrefix + n[0] * 10 + n[1]
    const birthMonth = n[2] * 10 + n[3]
    const birthDate = n[4] * 10 + n[5]
    birth = sanitizeDate(birthYear, birthMonth, birthDate)
    if (birth) {
      const now = options.now ? new Date(options.now) : new Date()
      const ageBase = now.getFullYear() - birthYear
      age = (now.getMonth() + 1) * 100 + now.getDate() >= birthMonth * 100 + birthDate ? ageBase : ageBase - 1
      krAge = ageBase + 1
    }
  }

  const parity = findParity(n, foreigner)

  return {
    valid: !!(typeof parity === 'number' && birth && n[12] === parity),
    parity: parity ?? null,
    gender: gender ?? null,
    foreigner: foreigner ?? null,
    birth: birth ?? null,
    age: age ?? null,
    krAge: krAge ?? null,
  }
}
