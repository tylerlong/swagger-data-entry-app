import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Form, Button, Popconfirm } from 'antd'

import { inputLayout, buttonLayout } from '../utils'

class RootInfo extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
  }

  render () {
    const { swagger } = this.props
    return (
      <Card title='Swagger'>
        <Form.Item label='Swagger' {...inputLayout}>
          <Input defaultValue='2.0' disabled />
        </Form.Item>
        <Form.Item label='Host' {...inputLayout}>
          <Input defaultValue={swagger.host} onChange={e => { this.form.host = e.target.value }} />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button onClick={() => swagger.replace(this.form)}>Save</Button>
        </Form.Item>
      </Card>
    )
  }
}

export default observer(RootInfo)
