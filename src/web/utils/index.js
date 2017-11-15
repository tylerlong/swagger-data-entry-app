import * as R from 'ramda'
import { getType } from 'mobx-state-tree'

export const update = self => {
  return (key, value) => {
    if (!R.has(key, getType(self).properties)) { // not a defined property in model
      throw new Error(`Unknown property '${key}'`)
    }
    self[key] = value
  }
}

export const replace = self => {
  return obj => {
    const keys = R.keys(getType(self).properties)
    R.forEach(key => {
      if (obj[key]) {
        self[key] = obj[key]
      }
    }, keys)
  }
}

export const removeUnexpectedProps = (obj, unexpectedKeys = [], unexpectedValues = []) => {
  Object.entries(obj).forEach(([key, val]) => {
    if (R.contains(key, unexpectedKeys) || R.contains(val, unexpectedValues)) {
      delete obj[key]
    } else if (typeof val === 'object') {
      obj[key] = removeUnexpectedProps(val, unexpectedKeys, unexpectedValues)
    }
  })
  return obj
}

export const toAndFromJson = obj => {
  return JSON.parse(JSON.stringify(obj))
}

export const primitiveTypes = ['object', 'array', 'string', 'number', 'boolean', 'integer', 'file']
