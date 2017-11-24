import React from 'react'
import { Form, Input, Icon, Button, Select, Card } from 'antd'
import { getParent } from 'mobx-state-tree'

import { inputLayout, buttonLayout } from '../../utils'

class Property extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
  }

  render () {
    const { name, property } = this.props
    let items = null
    if (property.items) {
      items = <Property property={property.items} />
    } else {
      items = <Button onClick={() => property.newItems()}>Add</Button>
    }
    return (
      <div>
        {name === undefined ? null : (
          <Form.Item label='Name' {...inputLayout}>
            <Input defaultValue={name} onChange={e => { this.form.name = e.target.value }} />
          </Form.Item>
        )}
        <Form.Item label='$ref' {...inputLayout}>
          <Input defaultValue={property.$ref} onChange={e => { this.form.$ref = e.target.value }} />
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
        <Form.Item label='Enum' {...inputLayout}>
          <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
            defaultValue={property.enum ? property.enum.toJSON() : []}
            onChange={value => { this.form.enum = value }} />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button onClick={() => {
            property.replace(this.form, true)
            if (this.form.name) {
              getParent(getParent(property)).renameProperty(name, this.form.name)
            }
          }} type='primary'><Icon type='save' /> Save</Button>
        </Form.Item>
        <Card title='Items'>
          {items}
        </Card>
      </div>
    )
  }
}

export default Property
