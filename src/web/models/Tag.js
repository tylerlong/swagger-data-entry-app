import { types } from 'mobx-state-tree'

const Tag = types.model({
  name: types.string,
  description: types.union(types.string, types.undefined)
})

export default Tag
