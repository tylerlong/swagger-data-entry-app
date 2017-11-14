import { types } from 'mobx-state-tree'

const Property = types.model({
  $ref: types.union(types.string, types.undefined),
  type: types.union(types.string, types.undefined),
  format: types.union(types.string, types.undefined),
  description: types.union(types.string, types.undefined),
  enum: types.union(types.array(types.string), types.undefined),
  items: types.union(types.late(() => Property), types.undefined),
  default: types.union(types.boolean, types.undefined),
  readOnly: types.union(types.boolean, types.undefined),
  minLength: types.union(types.number, types.undefined),
  maxLength: types.union(types.number, types.undefined),
  pattern: types.union(types.string, types.undefined)
})

export default Property
