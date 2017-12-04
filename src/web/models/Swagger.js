import { types } from 'mobx-state-tree'

import Info from './info/Info'
import PathItem from './paths/PathItem'
import { update, replace } from '../utils'
import Extensions from './Extensions'
import Tags from './tags/Tags'
import Definitions from './definitions/Definitions'

let Swagger = types.model({
  swagger: types.literal('2.0'),
  host: types.union(types.string, types.undefined),
  schemes: types.union(types.array(types.enumeration(['http', 'https', 'ws', 'wss'])), types.undefined),
  basePath: types.union(types.string, types.undefined),
  consumes: types.union(types.array(types.string), types.undefined),
  produces: types.union(types.array(types.string), types.undefined),
  info: Info,
  paths: types.map(PathItem)
}).actions(self => ({
  update: update(self),
  replace: replace(self),
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

Swagger = types.compose(Swagger, Tags, Definitions, Extensions)

export default Swagger
