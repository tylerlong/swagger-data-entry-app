import { types } from 'mobx-state-tree'
import yaml from 'js-yaml'

import Swagger from './Swagger'

const SwaggerFile = types.model({
  filePath: types.string,
  swagger: Swagger
})

const SwaggerStore = types.model({
  swaggerFiles: types.array(SwaggerFile)
}).actions(self => ({
  openSwaggerFile (filePath) {
    const swagger = Swagger.create(yaml.safeLoad(global.fs.readFileSync(filePath, 'utf8')))
    self.swaggerFiles.push(SwaggerFile.create({
      filePath,
      swagger
    }))
  },
  createSwaggerFile (filePath) {
    const swagger = Swagger.create({
      swagger: '2.0',
      info: {
        title: 'title',
        version: '1.0'
      },
      paths: {}
    })
    self.swaggerFiles.push(SwaggerFile.create({
      filePath,
      swagger
    }))
  }
}))

const swaggerStore = SwaggerStore.create({ swaggerFiles: [] })

export default swaggerStore
