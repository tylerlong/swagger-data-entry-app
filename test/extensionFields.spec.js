/* eslint-env jest */
import { wrapExtensionFields, unwrapExtensionFields } from '../src/web/utils'

describe('Extension fields', () => {
  const original = {
    a: 'a',
    'x-b': 'b',
    c: 'c',
    'x-d': 'd',
    e: {
      'x-f': 'f'
    },
    'x-g': {
      'x-h': 'h'
    }
  }

  const wrapped = {
    a: 'a',
    c: 'c',
    e: {
      'x-extension-fields': {
        'x-f': 'f'
      }
    },
    'x-extension-fields': {
      'x-b': 'b',
      'x-d': 'd',
      'x-g': {
        'x-extension-fields': {
          'x-h': 'h'
        }
      }
    }
  }

  test('Wrap extension fields', () => {
    expect(wrapExtensionFields(original)).toEqual(wrapped)
  })

  test('Unwrapper extension fields', () => {
    expect(unwrapExtensionFields(wrapped)).toEqual(original)
  })
})
