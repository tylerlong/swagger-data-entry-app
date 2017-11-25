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

// todo: do not provide removeEmpty feature
export const replace = self => {
  return (obj, removeEmpty = false) => {
    const keys = R.keys(getType(self).properties)
    R.forEach(key => {
      if (obj[key] !== undefined) {
        if (removeEmpty && R.isEmpty(obj[key])) {
          self[key] = undefined
        } else {
          self[key] = obj[key]
        }
      }
    }, keys)
  }
}

export const removeUnexpectedProps = (o, unexpectedKeys = [], unexpectedValues = []) => {
  const obj = R.clone(o)
  Object.keys(obj).forEach(key => {
    if (R.contains(key, unexpectedKeys) || R.contains(obj[key], unexpectedValues)) {
      delete obj[key]
    } else if (typeof obj[key] === 'object') {
      obj[key] = removeUnexpectedProps(obj[key], unexpectedKeys, unexpectedValues)
    }
  })
  return obj
}

export const toAndFromJson = obj => {
  return JSON.parse(JSON.stringify(obj))
}

export const primitiveTypes = ['object', 'array', 'string', 'number', 'boolean', 'integer', 'file']

export const inputLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}

export const buttonLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
}

export const wrapExtensionFields = o => {
  const obj = R.clone(o)
  Object.keys(obj).forEach(key => {
    if (key === 'x-extension-fields') {
      throw new Error('The object has already been wrapped!')
    }
    if (typeof obj[key] === 'object') {
      obj[key] = wrapExtensionFields(obj[key])
    }
    if (R.startsWith('x-', key)) {
      if (obj['x-extension-fields'] === undefined) {
        obj['x-extension-fields'] = {}
      }
      obj['x-extension-fields'][key] = obj[key]
      delete obj[key]
    }
  })
  return obj
}

export const unwrapExtensionFields = o => {
  const obj = R.clone(o)
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      obj[key] = unwrapExtensionFields(obj[key])
    }
    if (key === 'x-extension-fields') {
      Object.entries(obj[key]).forEach(([k, v]) => {
        obj[k] = v
      })
      delete obj['x-extension-fields']
    }
  })
  return obj
}
