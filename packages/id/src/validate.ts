
const RE_ID = /^\d{2}([0][0-9]|[1][0-2])([0][1-9]|[1-2][0-9]|[3][0-1])\d{7}$/

export interface ValidateOptions {
  enableForeigner?: boolean
}

export function validate(id: string, options: ValidateOptions = {}) {
  id = id.replace(/[^\d]/g, '')

  if (!RE_ID.test(id)) {
    return false
  }

  const chars = id.split('').map(n => +n)
  if (chars.length !== 13) {
    return false
  }

  let parity
  = (11
    - (chars[0] * 2
    + chars[1] * 3
    + chars[2] * 4
    + chars[3] * 5
    + chars[4] * 6
    + chars[5] * 7
    + chars[6] * 8
    + chars[7] * 9
    + chars[8] * 2
    + chars[9] * 3
    + chars[10] * 4
    + chars[11] * 5
    ) % 11
  ) % 10

  if ([1, 2, 3, 4, 9, 0].includes(chars[6]) && parity === chars[12]) {
    return true
  }

  if (options.enableForeigner) {
    parity = (parity + 2) % 10
    if ([5, 6, 7, 8].includes(chars[6]) && parity === chars[12]) {
      return true
    }
  }

  return false
}
