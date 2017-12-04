import { types } from 'mobx-state-tree'

import Property from './Property'
import { update, replace, mapActions } from '../../utils'

const Schema = types.model({
  type: types.union(types.literal('object'), types.undefined),
  description: types.union(types.string, types.undefined),
  required: types.union(types.array(types.string), types.undefined),
  properties: types.union(types.map(Property), types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self),
  afterCreate () {
    if (self.properties === undefined) {
      self.properties = {}
    }
  },
  ...mapActions(self, 'property')
}))

export default Schema
