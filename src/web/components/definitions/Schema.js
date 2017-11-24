import React from 'react'
import { Input, Form, Select, Button, Icon } from 'antd'
import { getParent } from 'mobx-state-tree'
import { observer } from 'mobx-react'

import { inputLayout, buttonLayout } from '../../utils'
import Properties from './Properties'

class Schema extends React.Component {
  constructor (props) {
    super(props)
    const { schema } = props
    schema.init()
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
        <Properties properties={schema.properties} />
      </div>
    )
  }
}

export default observer(Schema)
