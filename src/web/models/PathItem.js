import { types } from 'mobx-state-tree'

import Operation from './Operation'
import { update } from '../utils'

const PathItem = types.model({
  'x-request-max-body-size': types.union(types.string, types.undefined),
  get: types.union(Operation, types.undefined),
  post: types.union(Operation, types.undefined),
  put: types.union(Operation, types.undefined),
  delete: types.union(Operation, types.undefined)
}).actions(self => ({
  update: update(self)
}))

export default PathItem
