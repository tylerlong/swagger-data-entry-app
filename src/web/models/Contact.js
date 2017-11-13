import { types } from 'mobx-state-tree'

const Contact = types.model({
  name: types.string,
  url: types.string,
  email: types.string
})

export default Contact
