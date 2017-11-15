import React from 'react'
import { Tabs, Icon, Card, Button } from 'antd'

class App extends React.Component {
  render () {
    return <Tabs hideAdd type='editable-card'>
      <Tabs.TabPane key='home' closable={false} tab={<span><Icon type='home' /> Home</span>}>
        <Card title='Swagger specs' bordered={false}>
          <Button>Open</Button>
          <Button>New</Button>
        </Card>
      </Tabs.TabPane>
    </Tabs>
  }
}

export default App
