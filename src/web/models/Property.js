import { types } from 'mobx-state-tree'

const Property = types.model({
  $ref: types.maybe(types.string),
  type: types.maybe(types.string),
  format: types.maybe(types.string),
  description: types.maybe(types.string),
  enum: types.maybe(types.array(types.string)),
  items: types.maybe(types.late(() => Property)),
  default: types.maybe(types.boolean),
  readOnly: types.maybe(types.boolean)
})

export default Property
