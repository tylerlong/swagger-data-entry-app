import { types } from 'mobx-state-tree'

import Contact from './Contact'
import License from './License'

const Info = types.model({
  title: types.string,
  description: types.union(types.string, types.undefined),
  version: types.string,
  contact: types.union(Contact, types.undefined),
  license: types.union(License, types.undefined),
  termsOfService: types.union(types.string, types.undefined)
})

export default Info
