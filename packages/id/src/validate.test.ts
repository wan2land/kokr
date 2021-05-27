
import { validate } from './validate'


describe('testsuite of id', () => {
  it('test validate korean', () => {
    expect(validate('010101')).toBeFalsy() // wrong length
    expect(validate('010001-1010104')).toBeFalsy() // wrong month
    expect(validate('011301-1010104')).toBeFalsy() // wrong month
    expect(validate('010100-1010104')).toBeFalsy() // wrong day
    expect(validate('010132-1010104')).toBeFalsy() // wrong day


    expect(validate('0101011010104')).toBeTruthy()
    expect(validate('0101012010107')).toBeTruthy()
    expect(validate('0101013010100')).toBeTruthy()
    expect(validate('0101014010102')).toBeTruthy()
    expect(validate('0101019010106')).toBeTruthy()
    expect(validate('0101010010101')).toBeTruthy()

    expect(validate('010101-1010104')).toBeTruthy()
    expect(validate('010101-2010107')).toBeTruthy()
    expect(validate('010101-3010100')).toBeTruthy()
    expect(validate('010101-4010102')).toBeTruthy()
    expect(validate('010101-9010106')).toBeTruthy()
    expect(validate('010101-0010101')).toBeTruthy()

    expect(validate('010101 - 1010104')).toBeTruthy()
    expect(validate('010101 - 2010107')).toBeTruthy()
    expect(validate('010101 - 3010100')).toBeTruthy()
    expect(validate('010101 - 4010102')).toBeTruthy()
    expect(validate('010101 - 9010106')).toBeTruthy()
    expect(validate('010101 - 0010101')).toBeTruthy()
  })

  it('test validate foreigner', () => {
    // korean parity
    expect(validate('010101-5010105')).toBeFalsy()
    expect(validate('010101-6010108')).toBeFalsy()
    expect(validate('010101-7010101')).toBeFalsy()
    expect(validate('010101-8010103')).toBeFalsy()

    expect(validate('010101-5010107')).toBeFalsy()
    expect(validate('010101-6010100')).toBeFalsy()
    expect(validate('010101-7010103')).toBeFalsy()
    expect(validate('010101-8010105')).toBeFalsy()


    expect(validate('010101-5010105', { enableForeigner: true })).toBeFalsy()
    expect(validate('010101-6010108', { enableForeigner: true })).toBeFalsy()
    expect(validate('010101-7010101', { enableForeigner: true })).toBeFalsy()
    expect(validate('010101-8010103', { enableForeigner: true })).toBeFalsy()

    expect(validate('010101-5010107', { enableForeigner: true })).toBeTruthy()
    expect(validate('010101-6010100', { enableForeigner: true })).toBeTruthy()
    expect(validate('010101-7010103', { enableForeigner: true })).toBeTruthy()
    expect(validate('010101-8010105', { enableForeigner: true })).toBeTruthy()

    expect(validate('010101-8010105', { enableForeigner: true })).toBeTruthy()
  })
})
