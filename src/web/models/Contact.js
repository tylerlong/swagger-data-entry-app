import { types } from 'mobx-state-tree'

const Contact = types.model({
  name: 'RingCentral Connect Platform',
  url: 'http://developers.ringcentral.com',
  email: 'platform@ringcentral.com'
})

export default Contact
