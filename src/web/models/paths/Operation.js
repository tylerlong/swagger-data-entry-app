import { types } from 'mobx-state-tree'
import * as R from 'ramda'

import Parameter from './Parameter'
import Response from './Response'
import { update, replace, mapActions } from '../../utils'
import Extensions from '../Extensions'

let Operation = types.model({
  tags: types.union(types.array(types.string), types.undefined),
  summary: types.union(types.string, types.undefined),
  description: types.union(types.string, types.undefined),
  operationId: types.union(types.string, types.undefined),
  deprecated: types.union(types.boolean, types.undefined),
  consumes: types.union(types.array(types.string), types.undefined),
  produces: types.union(types.array(types.string), types.undefined),
  parameters: types.union(types.array(Parameter), types.undefined),
  responses: types.map(Response)
}).actions(self => ({
  update: update(self),
  replace: replace(self),
  newParameter (uuid) {
    self.parameters.push({ name: uuid, in: 'path' })
  },
  removeParameter (name) {
    self.parameters = R.reject(p => p.name === name, self.parameters)
  },
  ...mapActions(self, 'response')
})).actions(self => ({
  newResponse (uuid) { // override
    self.responses.set(uuid, { description: '' })
  }
}))

Operation = types.compose(Operation, Extensions)

export default Operation
