import { types } from 'mobx-state-tree'

import Operation from './Operation'
import { update } from '../utils'

const PathItem = types.model({
  'x-request-max-body-size': types.maybe(types.string),
  get: types.maybe(Operation),
  post: types.maybe(Operation),
  put: types.maybe(Operation),
  delete: types.maybe(Operation)
}).actions(self => ({
  update: update(self)
}))

export default PathItem
