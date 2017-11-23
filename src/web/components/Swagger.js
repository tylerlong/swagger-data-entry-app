import React from 'react'
import { observer } from 'mobx-react'
import { Tabs } from 'antd'

import SwaggerFields from './SwaggerFields'
import Info from './Info'
import Tags from './Tags'
import Paths from './Paths'
import Definitions from './Definitions'

class Swagger extends React.Component {
  constructor (props) {
    super(props)
    if (props.swagger.tags === undefined) {
      props.swagger.tags = []
    }
  }
  render () {
    const { swagger } = this.props
    const { info, tags } = swagger
    return (
      <Tabs tabPosition='left'>
        <Tabs.TabPane tab='Swagger' key='swagger'>
          <SwaggerFields swagger={swagger} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Info' key='info'>
          <Info info={info} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Tags' key='tags'>
          <Tags tags={tags} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Paths' key='paths'>
          <Paths />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Definitions' key='definitions'>
          <Definitions swagger={swagger} />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

export default observer(Swagger)
