import { types } from 'mobx-state-tree'

import Contact from './Contact'
import License from './License'

const Info = types.model({
  title: types.string,
  description: types.string,
  version: types.string,
  contact: Contact,
  license: License
})

export default Info
