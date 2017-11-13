import { types } from 'mobx-state-tree'

const Tag = types.model({
  name: types.identifier(types.string)
})

export default Tag
