import { types } from 'mobx-state-tree'

import Operation from './Operation'
import { update } from '../utils'

const PathItem = types.model({
  // 'x-request-max-body-size': types.union(types.string, types.undefined),
  'x-extension-fields': types.union(types.map(types.union(types.string, types.boolean)), types.undefined),
  get: types.union(Operation, types.undefined),
  post: types.union(Operation, types.undefined),
  put: types.union(Operation, types.undefined),
  delete: types.union(Operation, types.undefined),
  head: types.union(Operation, types.undefined)
}).views(self => ({
  extensionField (key) {
    if (self['x-extension-fields'] === undefined) {
      return undefined
    }
    return self['x-extension-fields'].get(key)
  }
})).actions(self => ({
  update: update(self),
  updateExtensionField (key, val) {
    self['x-extension-fields'].set(key, val)
  }
}))

export default PathItem
