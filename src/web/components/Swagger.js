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
    const { swagger } = props
    if (swagger.tags === undefined) {
      swagger.tags = [] // todo: this should throw exception because not modified via actions
    }
    if (swagger.definitions === undefined) {
      swagger.definitions = {} // todo: this should throw exception because not modified via actions
    }
  }
  render () {
    const { swagger } = this.props
    const { info, tags, definitions } = swagger
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
          <Definitions definitions={definitions} />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

export default observer(Swagger)
