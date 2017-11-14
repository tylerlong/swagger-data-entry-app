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

export const removeNullProps = o => {
  const obj = JSON.parse(JSON.stringify(o))
  Object.entries(obj).forEach(([key, val]) => {
    if (val === undefined || val === null) {
      delete obj[key]
    } else if (typeof val === 'object') {
      obj[key] = removeNullProps(val)
    }
  })
  return obj
}

export const removeUnexpectedProps = (o, unexpectedProps, unexpectedValues = []) => {
  const obj = JSON.parse(JSON.stringify(o))
  Object.entries(obj).forEach(([key, val]) => {
    if (R.contains(key, unexpectedProps) || R.contains(val, unexpectedValues)) {
      delete obj[key]
    } else if (typeof val === 'object') {
      obj[key] = removeUnexpectedProps(val, unexpectedProps, unexpectedValues)
    }
  })
  return obj
}
