import { types } from 'mobx-state-tree'

import { replace } from '../../utils'

const License = types.model({
  name: types.string,
  url: types.union(types.string, types.undefined)
}).actions(self => ({
  replace: replace(self)
}))

export default License
