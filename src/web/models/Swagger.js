import { types } from 'mobx-state-tree'

import Info from './Info'
import Tag from './Tag'
import PathItem from './PathItem'
import Schema from './Schema'
import { update } from '../utils'

const Swagger = types.model({
  swagger: types.literal('2.0'),
  info: Info,
  host: 'platform.ringcentral.com',
  schemes: types.union(types.array(types.enumeration(['http', 'https', 'ws', 'wss'])), types.undefined),
  basePath: '/restapi',
  produces: types.union(types.array(types.string), types.undefined),
  consumes: types.union(types.array(types.string), types.undefined),
  tags: types.array(Tag),
  'x-auth-required': true,
  'x-service-version': 'v1',
  'x-service-interface': 'rest',
  'x-service-name': 'pas',
  'x-internal-api': false,
  'x-blacklisting-strategy': 'Off',
  'x-metered-api': true,
  'x-metering-group': 'System',
  paths: types.map(PathItem),
  definitions: types.union(types.map(Schema), types.undefined)
}).actions(self => ({
  update: update(self)
}))

export default Swagger
