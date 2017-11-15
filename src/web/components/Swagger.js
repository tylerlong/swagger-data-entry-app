import React from 'react'
import { observer } from 'mobx-react'
import { Card } from 'antd'

import Info from './Info'

class Swagger extends React.Component {
  render () {
    const { swagger } = this.props
    const { info } = swagger
    return (
      <Card title={`${info.title} ${info.version}`}>
        <Info info={info} />
      </Card>
    )
  }
}

export default observer(Swagger)
