import { types } from 'mobx-state-tree'

import Parameter from './Parameter'
import Response from './Response'

const Operation = types.model({
  tags: types.union(types.array(types.string), types.undefined),
  summary: types.union(types.string, types.undefined),
  description: types.union(types.string, types.undefined),
  operationId: types.union(types.string, types.undefined),
  consumes: types.array(types.string),
  produces: types.array(types.string),
  parameters: types.array(Parameter),
  responses: types.map(Response),
  'x-api-group': types.string,
  'x-throttling-group': types.enumeration(['Light', 'Medium', 'Heavy', 'Auth']),
  'x-metered-api': types.union(types.boolean, types.undefined),
  'x-metering-group': types.union(types.string, types.undefined),
  'x-app-permission': types.union(types.string, types.undefined),
  'x-user-permission': types.union(types.string, types.undefined)
})

export default Operation
