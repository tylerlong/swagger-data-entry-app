import React from 'react'
import { Input, Form, Select, Card, Collapse, Popconfirm, Button, Icon } from 'antd'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'

import { inputLayout } from '../utils'
import Property from './Property'
import PropertyModel from '../models/Property'
import BaseComponent from './BaseComponent'

class Schema extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      properties: this.fromStore()
    }
  }

  fromStore () {
    const { schema: { properties } } = this.props
    if (properties === undefined) {
      return []
    }
    return R.pipe(
      R.keys,
      R.map(name => ({
        uuid: uuidv1(),
        name,
        schema: properties.get(name)
      })),
      R.sortBy(R.prop('name'))
    )(properties.toJSON())
  }

  toStore () {
    return R.pipe(
      R.map(property => ([property.name, property.schema.toJSON()])),
      R.fromPairs
    )(this.state.properties)
  }

  render () {
    const { schema } = this.props
    let properties = null
    if (this.state.properties.length > 0) {
      properties = <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setStateProp('activeKey', targetKey) }}>
        {this.state.properties.map((property, index) => (
          <Collapse.Panel header={property.name} key={property.uuid}>
            <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
              onConfirm={() => { this.setStateProp('properties', R.remove(index, 1)) }}>
              <Button type='danger'><Icon type='delete' /> Delete</Button>
            </Popconfirm>
            <Form.Item label='Name' {...inputLayout}>
              <Input defaultValue={property.name} onChange={e => { this.state.properties[index].name = e.target.value }} />
            </Form.Item>
            <Property property={property.schema} />
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
          {properties}
          <div style={{ marginTop: '16px' }}>
            <Button onClick={e => {
              const uuid = uuidv1()
              this.setStateProp('properties', R.append({ uuid, name: 'propertyName', schema: PropertyModel.create({}) }))
              this.setStateProp('activeKey', uuid)
            }}><Icon type='plus' />Add</Button>
            <Button type='primary' onClick={e => {
              schema.update('properties', this.toStore()) // sync state to store
              this.setState({ properties: this.fromStore() }) // sync store to state
            }}><Icon type='save' />Save</Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default Schema
