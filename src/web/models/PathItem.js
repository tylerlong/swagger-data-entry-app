import { types } from 'mobx-state-tree'

import Operation from './Operation'

const PathItem = types.model({
  'x-request-max-body-size': types.maybe(types.string),
  get: types.maybe(Operation),
  post: types.maybe(Operation),
  put: types.maybe(Operation),
  delete: types.maybe(Operation)
})

export default PathItem
