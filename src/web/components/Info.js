import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button, Form } from 'antd'

import { inputLayout, buttonLayout } from '../utils'

class Info extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
  }

  render () {
    const { info } = this.props
    return (
      <Card title='Info'>
        <Form.Item label='Title' {...inputLayout}>
          <Input defaultValue={info.title} onChange={e => { this.form.title = e.target.value }} />
        </Form.Item>
        <Form.Item label='Version' {...inputLayout}>
          <Input defaultValue={info.version} onChange={e => { this.form.version = e.target.value }} />
        </Form.Item>
        <Form.Item label='Description' {...inputLayout}>
          <Input defaultValue={info.description} onChange={e => { this.form.description = e.target.value }} />
        </Form.Item>
        <Form.Item label='Terms of Service' {...inputLayout}>
          <Input defaultValue={info.termsOfService} onChange={e => { this.form.termsOfService = e.target.value }} />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button onClick={() => this.props.info.replace(this.form)}>Save</Button>
        </Form.Item>
      </Card>
    )
  }
}

export default observer(Info)
