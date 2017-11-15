import { types } from 'mobx-state-tree'

import Swagger from './Swagger'

const SwaggerStore = types.model({
  swaggers: types.map(Swagger)
}).views(self => ({
  get size () {
    return self.swaggers.size
  }
})).actions(self => ({
  loadSwagger (filePath, obj) {
    self.swaggers.set(filePath, Swagger.create(obj))
  }
}))

const swaggerStore = SwaggerStore.create({ swaggers: {} })

export default swaggerStore
