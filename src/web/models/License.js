import { types } from 'mobx-state-tree'

const License = types.model({
  name: types.string,
  url: types.union(types.string, types.undefined)
})

export default License
