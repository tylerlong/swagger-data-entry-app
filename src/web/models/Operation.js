import { types } from 'mobx-state-tree'

import Tag from './Tag'
import Parameter from './Parameter'
import Response from './Response'

const Operation = types.model({
  tags: types.array(Tag),
  summary: types.string,
  description: types.string,
  operationId: types.string,
  consumes: types.array(types.string),
  produces: types.array(types.string),
  parameters: types.array(Parameter),
  responses: types.map(Response),
  'x-api-group': types.string,
  'x-throttling-group': types.enumeration(['Light', 'Medium', 'Heavy', 'Auth']),
  'x-metered-api': true,
  'x-metering-group': 'System',
  'x-app-permission': types.string,
  'x-user-permission': types.string
})

export default Operation
