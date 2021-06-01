
import { jongseong } from './jongseong'


describe('testsuite of jongseong', () => {
  it('test hangul', () => {
    expect(jongseong('가')).toEqual(0)
    expect(jongseong('납')).toEqual(17)
    expect(jongseong('닿')).toEqual(27)
    expect(jongseong('힣')).toEqual(27)
  })

  it('test number', () => {
    expect(jongseong('0')).toEqual(jongseong('영'))
    expect(jongseong('1')).toEqual(jongseong('일'))
    expect(jongseong('2')).toEqual(jongseong('이'))
    expect(jongseong('3')).toEqual(jongseong('삼'))
    expect(jongseong('4')).toEqual(jongseong('사'))
    expect(jongseong('5')).toEqual(jongseong('오'))
    expect(jongseong('6')).toEqual(jongseong('육'))
    expect(jongseong('7')).toEqual(jongseong('칠'))
    expect(jongseong('8')).toEqual(jongseong('팔'))
    expect(jongseong('9')).toEqual(jongseong('구'))

    expect(jongseong('00')).toEqual(jongseong('영'))
  })

  it('test number with zeros', () => {
    expect(jongseong('10')).toEqual(jongseong('십'))
    expect(jongseong('100')).toEqual(jongseong('백'))
    expect(jongseong('1000')).toEqual(jongseong('천'))
    expect(jongseong('10000')).toEqual(jongseong('만'))
    expect(jongseong('100000000')).toEqual(jongseong('억'))
    expect(jongseong('1000000000000')).toEqual(jongseong('조'))
    expect(jongseong('10000000000000000')).toEqual(jongseong('경'))
    expect(jongseong('100000000000000000000')).toEqual(jongseong('해'))
  })

  it('test english word', () => {
    expect(jongseong('ck')).toEqual(1)
    expect(jongseong('on')).toEqual(4)
    expect(jongseong('ne')).toEqual(4)
    expect(jongseong('al')).toEqual(8)
    expect(jongseong('le')).toEqual(8)
    expect(jongseong('om')).toEqual(16)
    expect(jongseong('up')).toEqual(17)
    expect(jongseong('et')).toEqual(19)
    expect(jongseong('ng')).toEqual(21)
    expect(jongseong('ob')).toEqual(17)

    expect(jongseong('coffee')).toEqual(jongseong('커피'))
    expect(jongseong('top')).toEqual(jongseong('탑'))
  })

  it('test english single', () => {
    expect(jongseong('l')).toEqual(jongseong('엘'))
    expect(jongseong('r')).toEqual(jongseong('알'))
    expect(jongseong('m')).toEqual(jongseong('엠'))
    expect(jongseong('n')).toEqual(jongseong('엔'))
    expect(jongseong('x')).toEqual(jongseong('엑스'))

    expect(jongseong('L')).toEqual(jongseong('엘'))
    expect(jongseong('R')).toEqual(jongseong('알'))
    expect(jongseong('M')).toEqual(jongseong('엠'))
    expect(jongseong('N')).toEqual(jongseong('엔'))
    expect(jongseong('X')).toEqual(jongseong('엑스'))
  })

  it('test random word', () => {
    expect(jongseong('서울')).toEqual(8)
    expect(jongseong('서울 ')).toEqual(8)
    expect(jongseong('서울!')).toEqual(8)

    expect(jongseong('완두')).toEqual(0)
    expect(jongseong('완두 ')).toEqual(0)
    expect(jongseong('완두!!!')).toEqual(0)

    expect(jongseong('!@#')).toEqual(0)
  })
})
