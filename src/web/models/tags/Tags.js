import { types } from 'mobx-state-tree'

import Tag from './Tag'

const Tags = types.model({
  tags: types.union(types.array(Tag), types.undefined)
}).actions(self => ({
  afterCreate () {
    if (self.tags === undefined) {
      self.tags = []
    }
  }
}))

export default Tags
