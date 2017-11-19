import React from 'react'
import { Form, Input } from 'antd'

import { inputLayout } from '../utils'

class Property extends React.Component {
  render () {
    const { property } = this.props
    return (
      <div>
        <Form.Item label='Description' {...inputLayout}>
          <Input defaultValue={property.description} onChange={e => { property.update('description', e.target.value) }} />
        </Form.Item>
      </div>
    )
  }
}

export default Property
