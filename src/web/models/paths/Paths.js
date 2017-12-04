import { types } from 'mobx-state-tree'

import PathItem from './PathItem'
import { mapActions } from '../../utils'

const Paths = types.model({
  paths: types.map(PathItem)
}).actions(self => ({
  ...mapActions(self, 'path')
}))

export default Paths
