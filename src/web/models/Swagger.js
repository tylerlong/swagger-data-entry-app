import { types } from 'mobx-state-tree'

import Info from './info/Info'
import Tag from './tags/Tag'
import PathItem from './paths/PathItem'
import Schema from './definitions/Schema'
import { update, replace, extensionFieldActions } from '../utils'

const Swagger = types.model({
  swagger: types.literal('2.0'),
  host: types.union(types.string, types.undefined),
  schemes: types.union(types.array(types.enumeration(['http', 'https', 'ws', 'wss'])), types.undefined),
  basePath: types.union(types.string, types.undefined),
  consumes: types.union(types.array(types.string), types.undefined),
  produces: types.union(types.array(types.string), types.undefined),
  'x-extension-fields': types.union(types.map(types.union(types.string, types.boolean, types.number)), types.undefined),
  info: Info,
  tags: types.union(types.array(Tag), types.undefined),
  paths: types.map(PathItem),
  definitions: types.union(types.map(Schema), types.undefined)
}).views(self => ({
  extensionField (name) {
    if (self['x-extension-fields'] === undefined) {
      return undefined
    }
    return self['x-extension-fields'].get(name)
  }
})).actions(self => ({
  update: update(self),
  replace: replace(self),
  ...extensionFieldActions(self),
  init () {
    if (self.tags === undefined) {
      self.tags = []
    }
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
    self.definitions.set(newName, self.definitions.get(name).toJSON())
    self.definitions.delete(name)
  },
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

export default Swagger
