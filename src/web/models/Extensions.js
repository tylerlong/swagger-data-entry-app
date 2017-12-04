import { types } from 'mobx-state-tree'

import { extensionFieldActions } from '../utils'

const Extensions = types.model({
  'x-extension-fields': types.union(types.map(types.union(types.string, types.boolean, types.number)), types.undefined)
}).views(self => ({
  extensionField (name) {
    if (self['x-extension-fields'] === undefined) {
      return undefined
    }
    return self['x-extension-fields'].get(name)
  }
})).actions(self => ({
  ...extensionFieldActions(self)
}))

export default Extensions
