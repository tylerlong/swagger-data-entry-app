import { types, detach } from 'mobx-state-tree'

import Schema from './Schema'

const Definitions = types.model({
  definitions: types.union(types.map(Schema), types.undefined)
}).actions(self => ({
  afterCreate () {
    if (self.definitions === undefined) {
      self.definitions = {}
    }
  },
  removeDefinition (name) {
    self.definitions.delete(name)
  },
  newDefinition (uuid) {
    self.definitions.set(uuid, {})
  },
  renameDefinition (name, newName) {
    if (newName === name) {
      return
    }
    if (self.definitions.has(newName)) {
      return
    }
    const node = self.definitions.get(name)
    detach(node)
    self.definitions.set(newName, node)
  }
}))

export default Definitions
