import { types } from 'mobx-state-tree'

import Properties from './Properties'
import { update, replace } from '../../utils'

let Schema = types.model({
  type: types.union(types.literal('object'), types.undefined),
  description: types.union(types.string, types.undefined),
  required: types.union(types.array(types.string), types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self)
}))

Schema = types.compose(Schema, Properties)

export default Schema
