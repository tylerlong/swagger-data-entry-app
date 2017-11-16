import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Form, Button, Popconfirm } from 'antd'
import { getParent } from 'mobx-state-tree'

import { inputLayout, buttonLayout } from '../utils'

class License extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
  }

  render () {
    const { license } = this.props
    return (
      <Card>
        <Form>
          <Form.Item label='Name' {...inputLayout}>
            <Input defaultValue={license.name} onChange={e => { this.form.name = e.target.value }} />
          </Form.Item>
          <Form.Item label='Url' {...inputLayout}>
            <Input defaultValue={license.url} onChange={e => { this.form.url = e.target.value }} />
          </Form.Item>
          <Form.Item {...buttonLayout}>
            <Button onClick={() => license.replace(this.form)}>Save</Button>
            <Popconfirm placement='top' title='Are you sure?' onConfirm={() => getParent(license).removeLicense()} okText='Yes' cancelText='No'>
              <Button type='danger'>Delete</Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default observer(License)
