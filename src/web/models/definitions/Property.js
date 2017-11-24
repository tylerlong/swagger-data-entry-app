import { types } from 'mobx-state-tree'

import { primitiveTypes, replace } from '../../utils'

const Property = types.model({
  $ref: types.union(types.string, types.undefined),
  type: types.union(types.enumeration(primitiveTypes), types.undefined),
  format: types.union(types.string, types.undefined),
  description: types.union(types.string, types.undefined),
  enum: types.union(types.array(types.string), types.undefined),
  default: types.union(types.string, types.boolean, types.undefined),
  readOnly: types.union(types.boolean, types.undefined),
  maxLength: types.union(types.number, types.undefined),
  minLength: types.union(types.number, types.undefined),
  pattern: types.union(types.string, types.undefined),
  items: types.union(types.late(() => Property), types.undefined),
  additionalProperties: types.union(types.late(() => Property), types.undefined)
}).actions(self => ({
  replace: replace(self),
  newProperty (name) {
    self[name] = {}
  },
  removeProperty (name) {
    self[name] = undefined
  }
}))

export default Property
