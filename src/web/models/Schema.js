import { types } from 'mobx-state-tree'

import Property from './Property'
import { update } from '../utils'

const Schema = types.model({
  type: types.union(types.literal('object'), types.undefined),
  description: types.union(types.string, types.undefined),
  required: types.union(types.array(types.string), types.undefined),
  properties: types.union(types.map(Property), types.undefined)
}).actions(self => ({
  update: update(self)
}))

export default Schema
