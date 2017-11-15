import React from 'react'
import { Tabs, Icon, Card, Button } from 'antd'

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

  render () {
    return (
      <Tabs hideAdd type='editable-card'>
        <Tabs.TabPane key='home' closable={false} tab={<span><Icon type='home' /> Home</span>}>
          <Card title='Swagger specs' bordered={false}>
            <Button onClick={this.onOpen}>Open</Button>
            <Button onClick={this.onCreate}>Create</Button>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

export default App
