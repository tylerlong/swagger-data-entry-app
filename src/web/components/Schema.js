import React from 'react'
import { Input, Form, Select } from 'antd'

import { inputLayout } from '../utils'

class Schema extends React.Component {
  render () {
    const { schema } = this.props
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
      </div>
    )
  }
}

export default Schema
