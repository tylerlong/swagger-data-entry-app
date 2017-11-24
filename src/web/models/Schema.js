import { types } from 'mobx-state-tree'

import Property from './Property'
import { update } from '../utils'

const Schema = types.model({
  type: types.union(types.literal('object'), types.undefined),
  description: types.union(types.string, types.undefined),
  required: types.union(types.array(types.string), types.undefined),
  properties: types.union(types.map(Property), types.undefined)
}).actions(self => ({
  update: update(self),
  initProperties () {
    self.properties = {}
  },
  removeProperty (name) {
    self.properties.delete(name)
  },
  newProperty (uuid) {
    self.properties.set(uuid, {})
  },
  renameProperty (name, newName) {
    if (name === newName) {
      return
    }
    if (self.properties.has(newName)) {
      return
    }
    self.properties.set(newName, self.properties.get(name).toJSON())
    self.properties.delete(name)
  }
}))

export default Schema
