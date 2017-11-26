import { types } from 'mobx-state-tree'

import Parameter from './Parameter'
import Response from './Response'
import { update, replace, extensionFieldActions } from '../../utils'

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
}).views(self => ({
  extensionField (name) {
    if (self['x-extension-fields'] === undefined) {
      return undefined
    }
    return self['x-extension-fields'].get(name)
  }
})).actions(self => ({
  update: update(self),
  replace: replace(self),
  ...extensionFieldActions(self)
}))

export default Operation
