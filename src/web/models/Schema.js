import { types } from 'mobx-state-tree'

import Property from './Property'

const Schema = types.model({
  required: types.union(types.array(types.string), types.undefined),
  type: types.union(types.literal('object'), types.undefined),
  properties: types.union(types.map(Property), types.undefined),
  description: types.union(types.string, types.undefined)
})

export default Schema
