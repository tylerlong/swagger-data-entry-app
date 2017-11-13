import { types } from 'mobx-state-tree'

const License = types.model({
  name: types.string,
  url: types.string
})

export default License
