import { types } from 'mobx-state-tree'

import Schema from './Schema'
import { mapActions } from '../../utils'

const Definitions = types.model({
  definitions: types.union(types.map(Schema), types.undefined)
}).actions(self => ({
  afterCreate () {
    if (self.definitions === undefined) {
      self.definitions = {}
    }
  },
  ...mapActions(self, 'definition')
}))

export default Definitions
