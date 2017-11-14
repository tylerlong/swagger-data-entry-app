import { types } from 'mobx-state-tree'

import Property from './Property'

const Parameter = types.model({
  name: types.string,
  format: types.maybe(types.string),
  in: types.enumeration(['query', 'header', 'path', 'formData', 'body']),
  description: types.maybe(types.string),
  required: false,
  type: types.maybe(types.string),
  enum: types.maybe(types.array(types.string)),
  items: types.maybe(Property),
  default: types.maybe(types.union(types.string, types.boolean)),
  schema: types.maybe(Property),
  collectionFormat: types.maybe(types.enumeration(['csv', 'ssv', 'tsv', 'pipes', 'multi']))
})

export default Parameter
