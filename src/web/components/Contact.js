import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Form, Button, Popconfirm, Icon } from 'antd'
import { getParent } from 'mobx-state-tree'

import { inputLayout, buttonLayout } from '../utils'

class Contact extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
  }

  render () {
    const { contact } = this.props
    return (
      <Card>
        <Form>
          <Form.Item label='Name' {...inputLayout}>
            <Input defaultValue={contact.name} onChange={e => { this.form.name = e.target.value }} />
          </Form.Item>
          <Form.Item label='Url' {...inputLayout}>
            <Input defaultValue={contact.url} onChange={e => { this.form.url = e.target.value }} />
          </Form.Item>
          <Form.Item label='Email' {...inputLayout}>
            <Input defaultValue={contact.email} onChange={e => { this.form.email = e.target.value }} />
          </Form.Item>
          <Form.Item {...buttonLayout}>
            <Button onClick={() => contact.replace(this.form)} type='primary'><Icon type='save' /> Save</Button>
            <Popconfirm placement='top' title='Are you sure?' onConfirm={() => getParent(contact).removeContact()} okText='Yes' cancelText='No'>
              <Button type='danger'><Icon type='delete' /> Delete</Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default observer(Contact)
