import { types } from 'mobx-state-tree'

const Contact = types.model({
  name: types.union(types.string, types.undefined),
  url: types.union(types.string, types.undefined),
  email: types.union(types.string, types.undefined)
})

export default Contact
