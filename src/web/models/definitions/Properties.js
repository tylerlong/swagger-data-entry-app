import { types } from 'mobx-state-tree'

import Property from './Property'
import { mapActions } from '../../utils'

const Properties = types.model({
  properties: types.union(types.map(Property), types.undefined)
}).volatile(self => ({
  activeProperty: ''
})).actions(self => ({
  afterCreate () {
    if (self.properties === undefined) {
      self.properties = {}
    }
  },
  ...mapActions(self, 'property'),
  setActiveProperty (uuid) {
    self.activeProperty = uuid
  }
}))

export default Properties
