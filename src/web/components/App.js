import React from 'react'
import { Tabs, Icon, Card, Button } from 'antd'
import { observer } from 'mobx-react'

import swaggerStore from '../models/swaggerStore'

class App extends React.Component {
  onOpen () {
    const filesOpened = global.electron.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'swagger files', extensions: ['yml', 'yaml'] }]
    })
    if (!filesOpened) {
      return
    }
    const filePath = filesOpened[0]
    swaggerStore.openSwaggerFile(filePath)
  }

  onCreate () {
    const filePath = global.electron.dialog.showSaveDialog({
      filters: [{ name: 'swagger files', extensions: ['yml', 'yaml'] }]
    })
    if (!filePath) {
      return
    }
    swaggerStore.createSwaggerFile(filePath)
  }

  onEdit (targetKey, action) {
    if (action === 'remove') {
      swaggerStore.closeFile(targetKey)
    }
  }

  render () {
    return (
      <Tabs hideAdd type='editable-card' onEdit={this.onEdit}>
        <Tabs.TabPane key='home' closable={false} tab={<span><Icon type='home' /> Home</span>}>
          <Card title='Swagger specs' bordered={false}>
            <Button onClick={this.onOpen}>Open</Button>
            <Button onClick={this.onCreate}>Create</Button>
          </Card>
        </Tabs.TabPane>
        {swaggerStore.swaggerFiles.map(swaggerFile => (
          <Tabs.TabPane key={swaggerFile.filePath} tab={swaggerFile.filePath}>
            {swaggerFile.filePath}
          </Tabs.TabPane>
        ))}
      </Tabs>
    )
  }
}

export default observer(App)
