import { types } from 'mobx-state-tree'
import * as R from 'ramda'

import Parameter from './Parameter'
import Responses from './Responses'
import { update, replace } from '../../utils'
import Extensions from '../common/Extensions'

let Operation = types.model({
  tags: types.union(types.array(types.string), types.undefined),
  summary: types.union(types.string, types.undefined),
  description: types.union(types.string, types.undefined),
  operationId: types.union(types.string, types.undefined),
  deprecated: types.union(types.boolean, types.undefined),
  consumes: types.union(types.array(types.string), types.undefined),
  produces: types.union(types.array(types.string), types.undefined),
  parameters: types.union(types.array(Parameter), types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self),
  newParameter (uuid) {
    self.parameters.push({ name: uuid, in: 'path' })
  },
  removeParameter (name) {
    self.parameters = R.reject(p => p.name === name, self.parameters)
  }
}))

Operation = types.compose(Operation, Responses, Extensions)

export default Operation
