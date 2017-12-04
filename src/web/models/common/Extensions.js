import { types } from 'mobx-state-tree'
import * as R from 'ramda'

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
  updateExtensionField (name, val) {
    self['x-extension-fields'].set(name, val)
  },
  replaceExtensionFields (fields) {
    self['x-extension-fields'] = {}
    R.forEach(([name, val]) => {
      self.updateExtensionField(name, val)
    }, fields)
  }
}))

export default Extensions
