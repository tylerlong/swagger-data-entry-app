import { types } from 'mobx-state-tree'

import Tag from './Tag'

const Operation = types.model({
  tags: types.array(types.reference(Tag)),
  summary: types.string,
  description: types.string,
  operationId: types.string,
  'x-api-group': types.string,
  'x-throttling-group': types.enumeration(['Light', 'Medium', 'Heavy', 'Auth']),
  'x-metered-api': true,
  'x-metering-group': 'System',
  'x-app-permission': types.string,
  'x-user-permission': types.string
})

export default Operation
