import { types, onSnapshot } from 'mobx-state-tree'
import yaml from 'js-yaml'
import * as R from 'ramda'

import Swagger from './Swagger'
import { toAndFromJson, wrapExtensionFields, unwrapExtensionFields } from '../utils'
import pkg from '../../../package.json'

const productName = pkg.build.productName
const currentWindow = global.electron.getCurrentWindow()

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
    const yamlData = yaml.safeDump(unwrapExtensionFields(toAndFromJson(self.swagger.toJSON())))
    global.fs.writeFileSync(self.filePath, yamlData)
  }
}))

const SwaggerStore = types.model({
  swaggerFiles: types.array(SwaggerFile)
}).volatile(self => ({
  activeTab: 'home'
})).views(self => ({
  get definitionNames () {
    if (self.activeTab === 'home') {
      return []
    }
    return R.pipe(
      R.find(R.propEq('filePath', self.activeTab)),
      R.prop('swagger'),
      R.prop('definitions'),
      R.invoker(0, 'keys'),
      R.sortBy(R.identity)
    )(self.swaggerFiles)
  }
})).actions(self => ({
  open (filePath) {
    if (R.find(R.propEq('filePath', filePath), self.swaggerFiles)) {
      self.setActiveTab(filePath)
      return
    }
    const swagger = Swagger.create(wrapExtensionFields(yaml.safeLoad(global.fs.readFileSync(filePath, 'utf8'))))
    self.swaggerFiles.push(SwaggerFile.create({
      filePath,
      swagger
    }))
    self.setActiveTab(filePath)
  },
  create (filePath) {
    const swagger = Swagger.create({
      swagger: '2.0',
      info: {
        title: 'Awesome API',
        version: '1.0'
      },
      paths: {}
    })
    let swaggerFile = R.find(R.propEq('filePath', filePath), self.swaggerFiles)
    if (swaggerFile) {
      swaggerFile.swagger = swagger
    } else {
      const swaggerFile = SwaggerFile.create({ filePath, swagger })
      self.swaggerFiles.push(swaggerFile)
    }
    self.setActiveTab(filePath)
  },
  clear () {
    self.swaggerFiles = []
    self.setActiveTab('home')
  },
  close (filePath) {
    self.swaggerFiles = R.reject(R.propEq('filePath', filePath), self.swaggerFiles)
    if (filePath === self.activeTab) {
      self.setActiveTab('home')
    }
  },
  setActiveTab (key) {
    self.activeTab = key
    if (key === 'home') {
      currentWindow.setTitle(productName)
    } else {
      currentWindow.setTitle(`${key} · ${productName}`)
    }
  },
  json2yaml () {
    const filesOpened = global.electron.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'JSON files', extensions: ['json'] }]
    })
    if (filesOpened) {
      const fileOpened = filesOpened[0]
      const fileToSave = global.electron.dialog.showSaveDialog({
        filters: [{ name: 'YAML files', extensions: ['yaml', 'yml'] }]
      })
      if (fileToSave) {
        const data = global.fs.readFileSync(fileOpened, 'utf-8')
        const yml = yaml.dump(JSON.parse(data))
        global.fs.writeFileSync(fileToSave, yml, 'utf-8')
        global.electron.shell.showItemInFolder(fileToSave)
      }
    }
  },
  yaml2json () {
    const filesOpened = global.electron.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'YAML files', extensions: ['yaml', 'yml'] }]
    })
    if (filesOpened) {
      const fileOpened = filesOpened[0]
      const fileToSave = global.electron.dialog.showSaveDialog({
        filters: [{ name: 'JSON files', extensions: ['json'] }]
      })
      if (fileToSave) {
        const data = global.fs.readFileSync(fileOpened, 'utf-8')
        const json = JSON.stringify(yaml.load(data), null, 2)
        global.fs.writeFileSync(fileToSave, json, 'utf-8')
        global.electron.shell.showItemInFolder(fileToSave)
      }
    }
  }
}))

const swaggerStore = SwaggerStore.create({ swaggerFiles: [] })

export default swaggerStore
