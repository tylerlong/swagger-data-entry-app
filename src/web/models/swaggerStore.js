import { types } from 'mobx-state-tree'
import yaml from 'js-yaml'

import Swagger from './Swagger'
import { toAndFromJson } from '../utils'

const SwaggerFile = types.model({
  filePath: types.string,
  swagger: Swagger
}).actions(self => ({
  save () {
    const yamlData = yaml.safeDump(toAndFromJson(self.swagger.toJSON()))
    global.fs.writeFileSync(self.filePath, yamlData)
  }
}))

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
    const swaggerFile = SwaggerFile.create({ filePath, swagger })
    swaggerFile.save()
    self.swaggerFiles.push(swaggerFile)
  },
  clear () {
    self.swaggerFiles = []
  }
}))

const swaggerStore = SwaggerStore.create({ swaggerFiles: [] })

export default swaggerStore
