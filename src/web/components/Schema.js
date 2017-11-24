import React from 'react'
import { Input, Form, Select, Card, Collapse, Popconfirm, Button, Icon } from 'antd'
import uuidv1 from 'uuid/v1'
import { getParent } from 'mobx-state-tree'
import { observer } from 'mobx-react'

import { inputLayout, buttonLayout } from '../utils'
import Property from './Property'
import BaseComponent from './BaseComponent'

class Schema extends BaseComponent {
  constructor (props) {
    super(props)
    const { schema } = props
    schema.init()
    this.state = {}
    this.form = {}
  }

  render () {
    const { name, schema } = this.props
    return (
      <div>
        <Form.Item label='Name' {...inputLayout}>
          <Input defaultValue={name} onChange={e => { this.form.name = e.target.value }} />
        </Form.Item>
        <Form.Item label='Type' {...inputLayout}>
          <Input value='object' disabled />
        </Form.Item>
        <Form.Item label='Description' {...inputLayout}>
          <Input defaultValue={schema.description} onChange={e => { this.form.description = e.target.value }} />
        </Form.Item>
        <Form.Item label='Required' {...inputLayout}>
          <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
            defaultValue={schema.required ? schema.required.toJSON() : []}
            onChange={value => { this.form.required = value }} />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button type='primary' onClick={e => {
            schema.replace(this.form, true)
            if (this.form.name) {
              getParent(getParent(schema)).renameDefinition(name, this.form.name)
            }
          }}><Icon type='save' />Save</Button>
        </Form.Item>
        <Card title='Properties'>
          {schema.properties.size < 1 ? null : (
            <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setStateProp('activeKey', targetKey) }}>
              {schema.properties.entries().map(([name, property]) => (
                <Collapse.Panel header={name} key={name}>
                  <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                    onConfirm={() => { schema.removeProperty(name) }}>
                    <Button type='danger'><Icon type='delete' /> Delete</Button>
                  </Popconfirm>
                  <Property name={name} property={property} />
                </Collapse.Panel>
              ))}
            </Collapse>
          )}
          <div style={{ marginTop: '16px' }}>
            <Button onClick={e => {
              const uuid = uuidv1()
              schema.newProperty(uuid)
              this.setStateProp('activeKey', uuid)
            }}><Icon type='plus' />Add</Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default observer(Schema)
