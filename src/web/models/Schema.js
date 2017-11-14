import { types } from 'mobx-state-tree'

import Property from './Property'

const Schema = types.model({
  required: types.maybe(types.array(types.string)),
  type: types.literal('object'),
  properties: types.map(Property)
})

export default Schema
