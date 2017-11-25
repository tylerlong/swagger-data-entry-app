import React from 'react'
import { Input, Form, Select, Button, Icon, Tooltip } from 'antd'
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
        <Form.Item label={<Tooltip title='Type must be "object"'><Icon type='question-circle' /> Type</Tooltip>} {...inputLayout}>
          <Input value='object' disabled />
        </Form.Item>
        <Form.Item label='Description' {...inputLayout}>
          <Input defaultValue={schema.description} onChange={e => { this.form.description = e.target.value }} />
        </Form.Item>
        <Form.Item label={<Tooltip title='Which properties are required?'><Icon type='question-circle' /> Required</Tooltip>} {...inputLayout}>
          <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
            defaultValue={schema.required ? schema.required.toJSON() : []}
            onChange={value => { this.form.required = value }} />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button onClick={e => {
            schema.replace(this.form)
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
