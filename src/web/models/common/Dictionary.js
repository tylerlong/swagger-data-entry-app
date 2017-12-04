import { types, detach } from 'mobx-state-tree'
import pluralize from 'pluralize'

import { capitalize } from '../../utils'

const Dictionary = (name, type, optional = true, defaultValue = {}) => {
  const capitalized = capitalize(name)
  const pluralized = pluralize(name)
  return types.model({
    [pluralized]: optional ? types.union(types.map(type), types.undefined) : types.map(type)
  }).volatile(self => ({
    [`active${capitalized}`]: ''
  })).actions(self => {
    const actions = {}
    actions[`remove${capitalized}`] = (name) => {
      self[`${pluralized}`].delete(name)
    }
    actions[`new${capitalized}`] = (uuid) => {
      self[`${pluralized}`].set(uuid, defaultValue)
    }
    actions[`rename${capitalized}`] = (name, newName) => {
      if (newName === name) {
        return
      }
      if (self[`${pluralized}`].has(newName)) {
        return
      }
      const node = self[`${pluralized}`].get(name)
      detach(node)
      self[`${pluralized}`].set(newName, node)
      if (self[`active${capitalized}`] === name) {
        self[`active${capitalized}`] = newName
      }
    }
    actions[`setActive${capitalized}`] = (uuid) => {
      self[`active${capitalized}`] = uuid
    }
    if (optional) {
      actions.afterCreate = () => {
        if (self[pluralized] === undefined) {
          self[pluralized] = defaultValue
        }
      }
    }
    return actions
  })
}

export default Dictionary
