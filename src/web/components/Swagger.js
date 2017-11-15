import React from 'react'
import { observer } from 'mobx-react'
import { Card } from 'antd'

class Swagger extends React.Component {
  render () {
    const { swagger } = this.props
    return (
      <Card title={swagger.info.title} bordered={false}>
        Swagger: {swagger.swagger}
      </Card>
    )
  }
}

export default observer(Swagger)
