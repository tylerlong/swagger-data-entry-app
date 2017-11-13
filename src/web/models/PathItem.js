import { types } from 'mobx-state-tree'

import Operation from './Operation'

const PathItem = types.model({
  'x-request-max-body-size': types.optional(types.union(types.string, types.undefined), undefined),
  get: types.optional(types.union(Operation, types.undefined), undefined),
  post: types.optional(types.union(Operation, types.undefined), undefined),
  put: types.optional(types.union(Operation, types.undefined), undefined),
  delete: types.optional(types.union(Operation, types.undefined), undefined)
})

export default PathItem
