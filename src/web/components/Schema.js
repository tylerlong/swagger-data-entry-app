import React from 'react'
import { Input, Form, Select, Card, Collapse, Popconfirm, Button, Icon } from 'antd'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'

import { inputLayout } from '../utils'
import Property from './Property'
import PropertyModel from '../models/Property'

class Schema extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: this.getFields()
    }
  }

  getFields () {
    const { schema } = this.props
    if (schema.properties === undefined) {
      return []
    }
    return R.pipe(
      R.keys,
      R.map(name => ({
        uuid: uuidv1(),
        name,
        schema: schema.properties.get(name)
      })),
      R.sortBy(R.prop('name'))
    )(schema.properties.toJSON())
  }

  getProperties () {
    return R.pipe(
      R.map(field => ([field.name, field.schema.toJSON()])),
      R.fromPairs
    )(this.state.fields)
  }

  render () {
    const { schema } = this.props
    let fields = null
    if (this.state.fields.length > 0) {
      fields = <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setState({ activeKey: targetKey }) }}>
        {this.state.fields.map(field => (
          <Collapse.Panel header={field.name} key={field.uuid}>
            <Popconfirm placement='top' title='Are you sure?' onConfirm={() => { this.setState({ fields: R.reject(f => f.uuid === field.uuid, this.state.fields) }) }} okText='Yes' cancelText='No'>
              <Button type='danger'><Icon type='delete' /> Delete</Button>
            </Popconfirm>
            <Form.Item label='Name' {...inputLayout}>
              <Input defaultValue={field.name} onChange={e => {
                this.state.fields[R.findIndex(R.propEq('uuid', field.uuid), this.state.fields)].name = e.target.value
              }} />
            </Form.Item>
            <Property property={field.schema} />
          </Collapse.Panel>
      ))}
      </Collapse>
    }
    return (
      <div>
        <Form.Item label='Type' {...inputLayout}>
          <Input value='object' disabled />
        </Form.Item>
        <Form.Item label='Description' {...inputLayout}>
          <Input defaultValue={schema.description} onChange={e => { schema.update('description', e.target.value) }} />
        </Form.Item>
        <Form.Item label='Required' {...inputLayout}>
          <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
            defaultValue={schema.required ? schema.required.toJSON() : []}
            onChange={value => { schema.update('required', value) }} />
        </Form.Item>
        <Card title='Properties'>
          {fields}
          <div style={{ marginTop: '16px' }}>
            <Button onClick={e => {
              const uuid = uuidv1()
              this.setState({
                activeKey: uuid,
                fields: R.append({ uuid, name: 'fieldName', schema: PropertyModel.create({}) }, this.state.fields)
              })
            }}><Icon type='plus' />Add</Button>
            <Button type='primary' onClick={e => {
              schema.update('properties', this.getProperties())
              this.setState({ fields: this.getFields() })
            }}><Icon type='save' />Save</Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default Schema
