import { types } from 'mobx-state-tree'

import Property from '../definitions/Property'
import { update, replace } from '../../utils'

const Response = types.model({
  description: types.string,
  schema: types.union(Property, types.undefined),
  examples: types.union(types.map(types.string), types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self)
}))

export default Response
