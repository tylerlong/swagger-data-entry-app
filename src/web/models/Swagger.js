import { types } from 'mobx-state-tree'

import Info from './info/Info'
import { update, replace } from '../utils'
import Extensions from './Extensions'
import Tags from './tags/Tags'
import Definitions from './definitions/Definitions'
import Paths from './paths/Paths'

let Swagger = types.model({
  swagger: types.literal('2.0'),
  host: types.union(types.string, types.undefined),
  schemes: types.union(types.array(types.enumeration(['http', 'https', 'ws', 'wss'])), types.undefined),
  basePath: types.union(types.string, types.undefined),
  consumes: types.union(types.array(types.string), types.undefined),
  produces: types.union(types.array(types.string), types.undefined),
  info: Info
}).actions(self => ({
  update: update(self),
  replace: replace(self)
}))

Swagger = types.compose(Swagger, Tags, Paths, Definitions, Extensions)

export default Swagger
