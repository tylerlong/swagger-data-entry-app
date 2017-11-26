import { types } from 'mobx-state-tree'
import * as R from 'ramda'

import Operation from './Operation'
import { update, replace } from '../../utils'

const PathItem = types.model({
  get: types.union(Operation, types.undefined),
  post: types.union(Operation, types.undefined),
  put: types.union(Operation, types.undefined),
  delete: types.union(Operation, types.undefined),
  head: types.union(Operation, types.undefined),
  'x-extension-fields': types.union(types.map(types.union(types.string, types.boolean)), types.undefined)
}).views(self => ({
  extensionField (name) {
    if (self['x-extension-fields'] === undefined) {
      return undefined
    }
    return self['x-extension-fields'].get(name)
  }
})).actions(self => ({
  update: update(self),
  replace: replace(self),
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

export default PathItem
