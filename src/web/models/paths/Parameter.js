import { types } from 'mobx-state-tree'

import Property from '../definitions/Property'
import { primitiveTypes, parameterIns, collectionFormats, update, replace } from '../../utils'

// todo: remove uncommon properties
const Parameter = types.model({
  name: types.string,
  in: types.enumeration(parameterIns),
  format: types.union(types.string, types.undefined),
  description: types.union(types.string, types.undefined),
  required: types.union(types.boolean, types.undefined),
  type: types.union(types.enumeration(primitiveTypes), types.undefined),
  enum: types.union(types.array(types.string), types.undefined),
  default: types.union(types.union(types.string, types.boolean, types.number), types.undefined),
  collectionFormat: types.union(types.enumeration(collectionFormats), types.undefined),
  maximum: types.union(types.number, types.undefined),
  minimum: types.union(types.number, types.undefined),
  items: types.union(Property, types.undefined),
  schema: types.union(Property, types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self)
}))

export default Parameter
