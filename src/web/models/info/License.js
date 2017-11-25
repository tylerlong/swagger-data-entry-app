import { types } from 'mobx-state-tree'

import { update, replace } from '../../utils'

const License = types.model({
  name: types.string,
  url: types.union(types.string, types.undefined)
}).actions(self => ({
  update: update(self),
  replace: replace(self)
}))

export default License
