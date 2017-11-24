import { types } from 'mobx-state-tree'

import { replace } from '../../utils'

const Contact = types.model({
  name: types.union(types.string, types.undefined),
  url: types.union(types.string, types.undefined),
  email: types.union(types.string, types.undefined)
}).actions(self => ({
  replace: replace(self)
}))

export default Contact
