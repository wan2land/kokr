
import { text } from './text'


describe('testsuite of text', () => {
  it('test text empty', () => {
    expect(text``).toEqual('')
  })
  it('test text 은/는', () => {
    expect(text`${'완두'}는 코딩을 합니다.`).toEqual('완두는 코딩을 합니다.')
    expect(text`${'완두'}은 코딩을 합니다.`).toEqual('완두는 코딩을 합니다.')

    expect(text`${'완삼'}는 코딩을 합니다.`).toEqual('완삼은 코딩을 합니다.')
    expect(text`${'완삼'}은 코딩을 합니다.`).toEqual('완삼은 코딩을 합니다.')
  })
  it('test text 이/가', () => {
    expect(text`${'완두'}가 코딩을 했습니다.`).toEqual('완두가 코딩을 했습니다.')
    expect(text`${'완두'}이 코딩을 했습니다.`).toEqual('완두가 코딩을 했습니다.')

    expect(text`${'완삼'}가 코딩을 했습니다.`).toEqual('완삼이 코딩을 했습니다.')
    expect(text`${'완삼'}이 코딩을 했습니다.`).toEqual('완삼이 코딩을 했습니다.')
  })
  it('test text 을/를', () => {
    expect(text`${'완두'}을 가르쳤습니다.`).toEqual('완두를 가르쳤습니다.')
    expect(text`${'완두'}를 가르쳤습니다.`).toEqual('완두를 가르쳤습니다.')

    expect(text`${'완삼'}을 가르쳤습니다.`).toEqual('완삼을 가르쳤습니다.')
    expect(text`${'완삼'}를 가르쳤습니다.`).toEqual('완삼을 가르쳤습니다.')
  })
  it('test text 와/과', () => {
    expect(text`${'완두'}와 코딩을 했습니다.`).toEqual('완두와 코딩을 했습니다.')
    expect(text`${'완두'}과 코딩을 했습니다.`).toEqual('완두와 코딩을 했습니다.')

    expect(text`${'완삼'}와 코딩을 했습니다.`).toEqual('완삼과 코딩을 했습니다.')
    expect(text`${'완삼'}과 코딩을 했습니다.`).toEqual('완삼과 코딩을 했습니다.')
  })

  it('test text 아/야', () => {
    expect(text`${'완두'}아!`).toEqual('완두야!')
    expect(text`${'완두'}야!`).toEqual('완두야!')

    expect(text`${'완삼'}아!`).toEqual('완삼아!')
    expect(text`${'완삼'}야!`).toEqual('완삼아!')
  })

  it('test text 이어/여', () => {
    expect(text`${'완두'}이어요.`).toEqual('완두여요.')
    expect(text`${'완두'}여요.`).toEqual('완두여요.')

    expect(text`${'완삼'}이어요.`).toEqual('완삼이어요.')
    expect(text`${'완삼'}여요.`).toEqual('완삼이어요.')
  })

  it('test text 이었/였', () => {
    expect(text`${'완두'}이었어요.`).toEqual('완두였어요.')
    expect(text`${'완두'}였어요.`).toEqual('완두였어요.')

    expect(text`${'완삼'}이었어요.`).toEqual('완삼이었어요.')
    expect(text`${'완삼'}였어요.`).toEqual('완삼이었어요.')
  })

  it('test text 이에요/예요', () => {
    expect(text`${'완두'}이에요.`).toEqual('완두예요.')
    expect(text`${'완두'}예요.`).toEqual('완두예요.')

    expect(text`${'완삼'}이에요.`).toEqual('완삼이에요.')
    expect(text`${'완삼'}예요.`).toEqual('완삼이에요.')
  })

  it('test text 으로/로', () => {
    expect(text`${'대구'}으로 갑시다.`).toEqual('대구로 갑시다.')
    expect(text`${'대구'}로 갑시다.`).toEqual('대구로 갑시다.')

    expect(text`${'부산'}으로 갑시다.`).toEqual('부산으로 갑시다.')
    expect(text`${'부산'}로 갑시다.`).toEqual('부산으로 갑시다.')

    // exception case
    expect(text`${'서울'}으로 갑시다.`).toEqual('서울로 갑시다.')
    expect(text`${'서울'}로 갑시다.`).toEqual('서울로 갑시다.')
  })
})
