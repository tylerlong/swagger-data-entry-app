import * as R from 'ramda'
import { getType, detach } from 'mobx-state-tree'

const capitalize = R.replace(/^./, R.toUpper)

export const mapActions = (self, model) => {
  const actions = {}
  actions[`remove${capitalize(model)}`] = (name) => {
    self[`${model}s`].delete(name)
  }
  actions[`new${capitalize(model)}`] = (uuid) => {
    self[`${model}s`].set(uuid, {})
  }
  actions[`rename${capitalize(model)}`] = (name, newName) => {
    if (newName === name) {
      return
    }
    if (self[`${model}s`].has(newName)) {
      return
    }
    const node = self[`${model}s`].get(name)
    detach(node)
    self[`${model}s`].set(newName, node)
  }
  return actions
}

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
      if (self[key] !== undefined && obj[key] !== undefined) {
        self[key] = obj[key]
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
export const parameterIns = ['query', 'header', 'path', 'formData', 'body']
export const collectionFormats = ['csv', 'ssv', 'tsv', 'pipes', 'multi']

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

export const normalizeValue = value => {
  let v = R.clone(value)
  v = v.trim()
  if (!isNaN(v)) {
    v = +v
  }
  if (value === 'true' || value === 'yes') {
    v = true
  }
  if (value === 'false' || value === 'no') {
    v = false
  }
  return v
}
