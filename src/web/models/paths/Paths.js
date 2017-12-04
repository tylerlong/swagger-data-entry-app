import { types } from 'mobx-state-tree'

import PathItem from './PathItem'

const Paths = types.model({
  paths: types.map(PathItem)
}).actions(self => ({
  removePath (name) {
    self.paths.delete(name)
  },
  newPath (uuid) {
    self.paths.set(uuid, {})
  },
  renamePath (name, newName) {
    if (newName === name) {
      return
    }
    if (self.paths.has(newName)) {
      return
    }
    self.paths.set(newName, self.paths.get(name).toJSON())
    self.paths.delete(name)
  }
}))

export default Paths
