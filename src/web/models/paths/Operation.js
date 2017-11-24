import { types } from 'mobx-state-tree'

import Parameter from './Parameter'
import Response from './Response'

const Operation = types.model({
  tags: types.union(types.array(types.string), types.undefined),
  summary: types.union(types.string, types.undefined),
  description: types.union(types.string, types.undefined),
  operationId: types.union(types.string, types.undefined),
  consumes: types.union(types.array(types.string), types.undefined),
  produces: types.union(types.array(types.string), types.undefined),
  parameters: types.union(types.array(Parameter), types.undefined),
  responses: types.map(Response),
  'x-extension-fields': types.union(types.map(types.union(types.string, types.boolean)), types.undefined)
  // 'x-api-group': types.union(types.string, types.undefined),
  // 'x-throttling-group': types.union(types.enumeration(['Light', 'Medium', 'Heavy', 'Auth', 'Unknown']), types.undefined),
  // 'x-metered-api': types.union(types.boolean, types.undefined),
  // 'x-metering-group': types.union(types.string, types.undefined),
  // 'x-app-permission': types.union(types.string, types.undefined),
  // 'x-user-permission': types.union(types.string, types.undefined)
}).views(self => ({
  extensionField (key) {
    if (self['x-extension-fields'] === undefined) {
      return undefined
    }
    return self['x-extension-fields'].get(key)
  }
})).actions(self => ({
  updateExtensionField (key, val) {
    self['x-extension-fields'].set(key, val)
  }
}))

export default Operation
