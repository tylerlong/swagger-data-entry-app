import { types } from 'mobx-state-tree'

import Property from './Property'

const Response = types.model({
  description: types.string,
  schema: types.union(Property, types.undefined),
  examples: types.union(types.map(types.string), types.undefined)
})

export default Response
