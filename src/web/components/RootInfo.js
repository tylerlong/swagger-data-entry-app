import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Form, Button, Select } from 'antd'

import { inputLayout, buttonLayout } from '../utils'
import Extension from './Extension'

class RootInfo extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    if (this.props.swagger['x-extension-fields'] === undefined) {
      props.swagger.initExtensionFields()
    }
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
        <Form.Item label='Schemes' {...inputLayout}>
          <Select mode='multiple' defaultValue={swagger.schemes ? swagger.schemes.toJSON() : []} style={{ width: '100%' }}
            onChange={value => { this.form.schemes = value }}>
            <Select.Option value='https'>https</Select.Option>
            <Select.Option value='http'>http</Select.Option>
            <Select.Option value='ws'>ws</Select.Option>
            <Select.Option value='wss'>wss</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='BasePath' {...inputLayout}>
          <Input defaultValue={swagger.basePath} onChange={e => { this.form.basePath = e.target.value }} />
        </Form.Item>
        <Form.Item label='Consumes' {...inputLayout}>
          <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
            defaultValue={swagger.consumes ? swagger.consumes.toJSON() : []}
            onChange={value => { this.form.consumes = value }} />
        </Form.Item>
        <Form.Item label='Produces' {...inputLayout}>
          <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
            defaultValue={swagger.produces ? swagger.produces.toJSON() : []}
            onChange={value => { this.form.produces = value }} />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button onClick={() => swagger.replace(this.form)}>Save</Button>
        </Form.Item>
        <Form.Item label='Extension Fields' {...inputLayout}>
          <Extension extensionFields={swagger['x-extension-fields']} />
        </Form.Item>
      </Card>
    )
  }
}

export default observer(RootInfo)
