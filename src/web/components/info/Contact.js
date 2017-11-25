import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Form, Button, Popconfirm, Icon, Checkbox } from 'antd'
import { getParent } from 'mobx-state-tree'
import * as R from 'ramda'

import { inputLayout, buttonLayout } from '../../utils'

class Contact extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { contact } = this.props
    this.fields = {
      name: () => <Input defaultValue={contact.name} onChange={e => { this.form.name = e.target.value }} />,
      url: () => <Input defaultValue={contact.url} onChange={e => { this.form.url = e.target.value }} />,
      email: () => <Input defaultValue={contact.email} onChange={e => { this.form.email = e.target.value }} />
    }
    this.defaultValues = {
      name: 'Contact Name',
      url: 'Contact Url',
      email: 'Contact Email'
    }
  }

  render () {
    const { contact } = this.props
    return (
      <Card>
        <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
          onConfirm={() => getParent(contact).removeContact()} >
          <Button type='danger'><Icon type='delete' /> Delete</Button>
        </Popconfirm>
        <Form>
          { R.toPairs(this.fields).map(([name, component]) => contact[name] === undefined ? null : (
            <Form.Item label={name} {...inputLayout} key={name}>
              {component()}
            </Form.Item>
          )) }
          <Form.Item {...buttonLayout}>
            <Button onClick={() => contact.replace(this.form)} type='primary'><Icon type='save' /> Save</Button>
          </Form.Item>
          <Form.Item label='Optional fields' {...inputLayout}>
            {R.keys(this.fields).map(name => {
              return <Checkbox checked={contact[name] !== undefined} key={name} onChange={e => {
                if (e.target.checked) {
                  contact.update(name, this.defaultValues[name])
                } else {
                  contact.update(name, undefined)
                  delete this.form[name]
                }
              }}>{name}</Checkbox>
            })}
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default observer(Contact)
