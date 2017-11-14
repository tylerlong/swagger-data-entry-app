import { types } from 'mobx-state-tree'

import Property from './Property'
import { primitiveTypes } from '../utils'

const Schema = types.model({
  required: types.union(types.array(types.string), types.undefined),
  type: types.union(types.enumeration(primitiveTypes), types.undefined),
  properties: types.union(types.map(Property), types.undefined),
  description: types.union(types.string, types.undefined)
})

export default Schema
