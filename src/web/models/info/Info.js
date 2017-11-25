import { types } from 'mobx-state-tree'

import Contact from './Contact'
import License from './License'
import { update, replace } from '../../utils'

const Info = types.model({
  title: types.string,
  version: types.string,
  description: types.union(types.string, types.undefined),
  termsOfService: types.union(types.string, types.undefined),
  contact: types.union(Contact, types.undefined),
  license: types.union(License, types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self),
  newContact () {
    self.contact = {}
  },
  removeContact () {
    self.contact = undefined
  },
  newLicense () {
    self.license = { name: '' }
  },
  removeLicense () {
    self.license = undefined
  }
}))

export default Info
