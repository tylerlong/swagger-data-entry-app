import { types } from 'mobx-state-tree'

import Info from './Info'
import Tag from './Tag'
import PathItem from './PathItem'
import Schema from './Schema'
import { update, replace } from '../utils'
import * as R from 'ramda'

const Swagger = types.model({
  swagger: types.literal('2.0'),
  host: types.union(types.string, types.undefined),
  schemes: types.union(types.array(types.enumeration(['http', 'https', 'ws', 'wss'])), types.undefined),
  basePath: types.union(types.string, types.undefined),
  consumes: types.union(types.array(types.string), types.undefined),
  produces: types.union(types.array(types.string), types.undefined),
  'x-extension-fields': types.union(types.map(types.union(types.string, types.boolean)), types.undefined),
  // 'x-auth-required': types.union(types.boolean, types.undefined),
  // 'x-service-version': types.union(types.string, types.undefined),
  // 'x-service-interface': types.union(types.string, types.undefined),
  // 'x-service-name': types.union(types.string, types.undefined),
  // 'x-internal-api': types.union(types.boolean, types.undefined),
  // 'x-blacklisting-strategy': types.union(types.string, types.undefined),
  // 'x-metered-api': types.union(types.boolean, types.undefined),
  // 'x-metering-group': types.union(types.string, types.undefined),
  info: Info,
  tags: types.union(types.array(Tag), types.undefined),
  paths: types.map(PathItem),
  definitions: types.union(types.map(Schema), types.undefined)
}).views(self => ({
  extensionField (key) {
    if (self['x-extension-fields'] === undefined) {
      return undefined
    }
    return self['x-extension-fields'].get(key)
  }
})).actions(self => ({
  update: update(self),
  replace: replace(self),
  initExtensionFields () {
    self['x-extension-fields'] = {}
  },
  updateExtensionField (key, val) {
    self['x-extension-fields'].set(key, val)
  },
  replaceExtensionFields (fields) {
    self['x-extension-fields'] = {}
    R.forEach(([k, v]) => {
      self.updateExtensionField(k, v)
    }, fields)
  }
}))

export default Swagger
