
export function format(phone?: string | null): string {
  if (!phone) {
    return ''
  }
  phone = phone.replace(/[^0-9]/g, '')
  const len = phone.length

  // 15xx ~ 19xx
  if (/^(15|16|17|18|19)/.exec(phone)) {
    if (len <= 4) {
      return phone
    }
    if (len <= 8) {
      return `${phone.substr(0, 4)}-${phone.substr(4)}`
    }
    return phone
  }

  let n0 = 3
  if (phone.startsWith('02')) { // 02-xxxx
    n0 = 2
  } else if (phone.startsWith('0505')) {
    n0 = 4
  }

  if (len <= n0) {
    return phone
  }
  if (len <= n0 + 3) {
    return [phone.slice(0, n0), phone.substr(n0)].filter(c => c).join('-')
  }
  if (len <= n0 + 7) {
    return [phone.substr(0, n0), phone.substr(n0, 3), phone.substr(n0 + 3)].filter(c => c).join('-')
  }
  if (len <= n0 + 8) {
    return [phone.substr(0, n0), phone.substr(n0, 4), phone.substr(n0 + 4)].filter(c => c).join('-')
  }
  return phone
}
