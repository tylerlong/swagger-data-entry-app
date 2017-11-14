import * as R from 'ramda'

export const update = self => {
  return (key, value) => {
    if (self[key] === undefined) {
      throw new Error(`Unknown key '${key}'`)
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
