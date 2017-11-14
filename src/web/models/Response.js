import { types } from 'mobx-state-tree'

import Property from './Property'

const Response = types.model({
  description: types.string,
  schema: types.maybe(Property)
})

export default Response
