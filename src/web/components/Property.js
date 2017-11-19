import React from 'react'
import { Form, Input, Icon, Button } from 'antd'

import { inputLayout, buttonLayout } from '../utils'

class Property extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
  }
  render () {
    const { property } = this.props
    return (
      <div>
        <Form.Item label='$ref' {...inputLayout}>
          <Input defaultValue={property['$ref']} onChange={e => { this.form['$ref'] = e.target.value }} />
        </Form.Item>
        <Form.Item label='Type' {...inputLayout}>
          <Input defaultValue={property.type} onChange={e => { this.form.type = e.target.value }} />
        </Form.Item>
        <Form.Item label='Format' {...inputLayout}>
          <Input defaultValue={property.format} onChange={e => { this.form.format = e.target.value }} />
        </Form.Item>
        <Form.Item label='Description' {...inputLayout}>
          <Input defaultValue={property.description} onChange={e => { this.form.description = e.target.value }} />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button onClick={() => property.replace(this.form, true)} type='primary'><Icon type='save' /> Save</Button>
        </Form.Item>
      </div>
    )
  }
}

export default Property
