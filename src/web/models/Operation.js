import { types } from 'mobx-state-tree'

import Parameter from './Parameter'
import Response from './Response'

const Operation = types.model({
  tags: types.maybe(types.array(types.string)),
  summary: types.maybe(types.string),
  description: types.maybe(types.string),
  operationId: types.maybe(types.string),
  consumes: types.array(types.string),
  produces: types.array(types.string),
  parameters: types.array(Parameter),
  responses: types.map(Response),
  'x-api-group': types.string,
  'x-throttling-group': types.enumeration(['Light', 'Medium', 'Heavy', 'Auth']),
  'x-metered-api': types.maybe(types.boolean),
  'x-metering-group': types.maybe(types.string),
  'x-app-permission': types.maybe(types.string),
  'x-user-permission': types.maybe(types.string)
})

export default Operation
