import { types } from 'mobx-state-tree'

import Info from './Info'
import Tag from './Tag'
import PathItem from './PathItem'
import Schema from './Schema'

const Swagger = types.model({
  swagger: types.literal('2.0'),
  info: Info,
  host: 'platform.ringcentral.com',
  schemes: types.array(types.enumeration(['http', 'https', 'ws', 'wss'])),
  basePath: '/restapi',
  produces: types.array(types.string),
  tags: types.array(types.reference(Tag)),
  'x-auth-required': true,
  'x-service-version': 'v1',
  'x-service-interface': 'rest',
  'x-service-name': 'pas',
  'x-internal-api': false,
  'x-blacklisting-strategy': 'Off',
  'x-metered-api': true,
  'x-metering-group': 'System',
  paths: types.map(PathItem),
  definitions: types.map(types.reference(Schema))
})

export default Swagger
