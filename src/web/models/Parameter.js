import { types } from 'mobx-state-tree'

import Property from './Property'

const Parameter = types.model({
  name: types.string,
  format: types.union(types.string, types.undefined),
  in: types.enumeration(['query', 'header', 'path', 'formData', 'body']),
  description: types.union(types.string, types.undefined),
  required: false,
  type: types.union(types.string, types.undefined),
  enum: types.union(types.array(types.string), types.undefined),
  items: types.union(Property, types.undefined),
  default: types.union(types.union(types.string, types.boolean), types.undefined),
  schema: types.union(Property, types.undefined),
  collectionFormat: types.union(types.enumeration(['csv', 'ssv', 'tsv', 'pipes', 'multi']), types.undefined),
  maximum: types.union(types.number, types.undefined),
  minimum: types.union(types.number, types.undefined)
})

export default Parameter
