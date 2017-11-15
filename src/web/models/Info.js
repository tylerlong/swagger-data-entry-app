import { types } from 'mobx-state-tree'

import Contact from './Contact'
import License from './License'
import { update, replace } from '../utils'

const Info = types.model({
  title: types.string,
  description: types.union(types.string, types.undefined),
  version: types.string,
  contact: types.union(Contact, types.undefined),
  license: types.union(License, types.undefined),
  termsOfService: types.union(types.string, types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self)
}))

export default Info
