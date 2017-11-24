import { types } from 'mobx-state-tree'

import Property from '../definitions/Property'
import { primitiveTypes } from '../../utils'

const Parameter = types.model({
  name: types.string,
  format: types.union(types.string, types.undefined),
  in: types.enumeration(['query', 'header', 'path', 'formData', 'body']),
  description: types.union(types.string, types.undefined),
  required: types.union(types.boolean, types.undefined),
  type: types.union(types.enumeration(primitiveTypes), types.undefined),
  enum: types.union(types.array(types.string), types.undefined),
  items: types.union(Property, types.undefined),
  default: types.union(types.union(types.string, types.boolean, types.number), types.undefined),
  schema: types.union(Property, types.undefined),
  collectionFormat: types.union(types.enumeration(['csv', 'ssv', 'tsv', 'pipes', 'multi']), types.undefined),
  maximum: types.union(types.number, types.undefined),
  minimum: types.union(types.number, types.undefined)
})

export default Parameter
