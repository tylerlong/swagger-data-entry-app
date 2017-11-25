import { types } from 'mobx-state-tree'

import { update, replace } from '../../utils'

const Contact = types.model({
  name: types.union(types.string, types.undefined),
  url: types.union(types.string, types.undefined),
  email: types.union(types.string, types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self)
}))

export default Contact
