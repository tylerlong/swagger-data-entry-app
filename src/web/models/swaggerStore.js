import { types, onSnapshot } from 'mobx-state-tree'
import yaml from 'js-yaml'
import * as R from 'ramda'

import Swagger from './Swagger'
import { toAndFromJson } from '../utils'

const SwaggerFile = types.model({
  filePath: types.string,
  swagger: Swagger
}).actions(self => ({
  afterCreate () {
    self.save()
    onSnapshot(self, newSnapshot => {
      self.save()
    })
  },
  save () {
    const yamlData = yaml.safeDump(toAndFromJson(self.swagger.toJSON()))
    global.fs.writeFileSync(self.filePath, yamlData)
  }
}))

const SwaggerStore = types.model({
  activeKey: 'home',
  swaggerFiles: types.array(SwaggerFile)
}).actions(self => ({
  open (filePath) {
    const swagger = Swagger.create(yaml.safeLoad(global.fs.readFileSync(filePath, 'utf8')))
    self.swaggerFiles.push(SwaggerFile.create({
      filePath,
      swagger
    }))
    self.setActiveKey(filePath)
  },
  create (filePath) {
    const swagger = Swagger.create({
      swagger: '2.0',
      info: {
        title: 'title',
        version: '1.0'
      },
      paths: {}
    })
    const swaggerFile = SwaggerFile.create({ filePath, swagger })
    self.swaggerFiles.push(swaggerFile)
    self.setActiveKey(filePath)
  },
  clear () {
    self.swaggerFiles = []
    self.setActiveKey('home')
  },
  close (filePath) {
    self.swaggerFiles = R.reject(R.propEq('filePath', filePath), self.swaggerFiles)
    if (filePath === self.activeKey) {
      self.setActiveKey('home')
    }
  },
  setActiveKey (key) {
    self.activeKey = key
  }
}))

const swaggerStore = SwaggerStore.create({ swaggerFiles: [] })

export default swaggerStore
