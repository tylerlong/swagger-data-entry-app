import { types, detach } from 'mobx-state-tree'

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
    const node = self.paths.get(name)
    detach(node)
    self.paths.set(newName, node)
  }
}))

export default Paths
