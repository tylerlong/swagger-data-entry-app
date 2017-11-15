import React from 'react'
import { Tabs, Icon, Card, Button } from 'antd'
import { observer } from 'mobx-react'
import * as R from 'ramda'

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
    swaggerStore.open(filePath)
  }

  onCreate () {
    const filePath = global.electron.dialog.showSaveDialog({
      filters: [{ name: 'swagger files', extensions: ['yml', 'yaml'] }]
    })
    if (!filePath) {
      return
    }
    swaggerStore.create(filePath)
  }

  onEdit (targetKey, action) {
    if (action === 'remove') {
      swaggerStore.close(targetKey)
    }
  }

  render () {
    return (
      <Tabs hideAdd type='editable-card' onEdit={this.onEdit} activeKey={swaggerStore.activeKey}
        onChange={targetKey => swaggerStore.setActiveKey(targetKey)}>
        <Tabs.TabPane key='home' closable={false} tab={<span><Icon type='home' />Home</span>}>
          <Card title='Swagger specs' bordered={false}>
            <Button onClick={this.onOpen}>Open</Button>
            <Button onClick={this.onCreate}>Create</Button>
          </Card>
        </Tabs.TabPane>
        {swaggerStore.swaggerFiles.map(swaggerFile => (
          <Tabs.TabPane key={swaggerFile.filePath} tab={R.last(swaggerFile.filePath.split('/'))}>
            {swaggerFile.filePath}
          </Tabs.TabPane>
        ))}
      </Tabs>
    )
  }
}

export default observer(App)
