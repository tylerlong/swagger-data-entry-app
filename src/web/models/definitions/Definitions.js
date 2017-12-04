import { types } from 'mobx-state-tree'

import Schema from './Schema'
import { mapActions } from '../../utils'

const Definitions = types.model({
  definitions: types.union(types.map(Schema), types.undefined)
}).volatile(self => ({
  activeDefinition: ''
})).actions(self => ({
  afterCreate () {
    if (self.definitions === undefined) {
      self.definitions = {}
    }
  },
  ...mapActions(self, 'definition'),
  setActiveDefinition (uuid) {
    self.activeDefinition = uuid
  }
}))

export default Definitions
