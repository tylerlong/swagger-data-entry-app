import React from 'react'
import { observer } from 'mobx-react'
import { Tabs } from 'antd'

import RootInfo from './RootInfo'
import Info from './Info'
import Tags from './Tags'

class Swagger extends React.Component {
  render () {
    const { swagger } = this.props
    const { info, tags } = swagger
    return (
      <Tabs tabPosition='left'>
        <Tabs.TabPane tab='Swagger' key='swagger'>
          <RootInfo swagger={swagger} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Info' key='info'>
          <Info info={info} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Tags' key='tags'>
          <Tags tags={tags} />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

export default observer(Swagger)
