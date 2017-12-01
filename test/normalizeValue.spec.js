/* eslint-env jest */
import { normalizeValue } from '../src/web/utils'

describe('normalizeValue', () => {
  test('numbers', () => {
    expect(normalizeValue('123')).toEqual(123)
    expect(normalizeValue('123.45')).toEqual(123.45)
  })

  test('booleans', () => {
    expect(normalizeValue('true')).toEqual(true)
    expect(normalizeValue('false')).toEqual(false)
    expect(normalizeValue('yes')).toEqual(true)
    expect(normalizeValue('no')).toEqual(false)
  })

  test('strings', () => {
    expect(normalizeValue('123a')).toEqual('123a')
    expect(normalizeValue('hello')).toEqual('hello')
  })
})
