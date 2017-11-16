import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Form, Button } from 'antd'
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
            <Button onClick={() => contact.replace(this.form)}>Save</Button>
            <Button type='danger' onClick={() => getParent(contact).removeContact()}>Delete</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default observer(Contact)
