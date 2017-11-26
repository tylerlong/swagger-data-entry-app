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
  extensionField (key) {
    if (self['x-extension-fields'] === undefined) {
      return undefined
    }
    return self['x-extension-fields'].get(key)
  }
})).actions(self => ({
  update: update(self),
  replace: replace(self),
  updateExtensionField (key, val) {
    self['x-extension-fields'].set(key, val)
  },
  replaceExtensionFields (fields) {
    self['x-extension-fields'] = {}
    R.forEach(([k, v]) => {
      self.updateExtensionField(k, v)
    }, fields)
  }
}))

export default PathItem
