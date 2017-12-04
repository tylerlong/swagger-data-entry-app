import { types } from 'mobx-state-tree'
import pluralize from 'pluralize'

import { capitalize, mapActions } from '../../utils'

const Dictionary = (name, type, optional = true, defaultValue = {}) => {
  const capitalized = capitalize(name)
  const pluralized = pluralize(name)
  return types.model({
    [pluralized]: optional ? types.union(types.map(type), types.undefined) : types.map(type)
  }).volatile(self => ({
    [`active${capitalized}`]: ''
  })).actions(self => {
    const actions = { ...mapActions(self, name) }
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
