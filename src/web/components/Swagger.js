import React from 'react'
import { observer } from 'mobx-react'
import { Tabs } from 'antd'

import SwaggerFields from './SwaggerFields'
import Info from './info/Info'
import Tags from './tags/Tags'
import Paths from './paths/Paths'
import Definitions from './definitions/Definitions'

class Swagger extends React.Component {
  constructor (props) {
    super(props)
    const { swagger } = props
    swagger.init()
  }

  render () {
    const { swagger } = this.props
    const { info, tags, definitions, paths } = swagger
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
          <Paths paths={paths} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Definitions' key='definitions'>
          <Definitions definitions={definitions} />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

export default observer(Swagger)
