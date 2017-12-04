import { types } from 'mobx-state-tree'

import Operation from './Operation'
import { update, replace } from '../../utils'
import Extensions from './Extensions'

let PathItem = types.model({
  get: types.union(Operation, types.undefined),
  post: types.union(Operation, types.undefined),
  put: types.union(Operation, types.undefined),
  delete: types.union(Operation, types.undefined),
  head: types.union(Operation, types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self)
}))

PathItem = types.compose(PathItem, Extensions)

export default PathItem
