import React from 'react'
import { observer } from 'mobx-react'
import { Tabs } from 'antd'

import Info from './Info'
import RootInfo from './RootInfo'

class Swagger extends React.Component {
  render () {
    const { swagger } = this.props
    const { info } = swagger
    return (
      <Tabs tabPosition='left'>
        <Tabs.TabPane tab='Swagger' key='swagger'>
          <RootInfo swagger={swagger} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Info' key='info'>
          <Info info={info} />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

export default observer(Swagger)
