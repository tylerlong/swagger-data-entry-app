import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button, Form, Icon, Checkbox } from 'antd'
import * as R from 'ramda'

import { inputLayout, buttonLayout } from '../../utils'
import Contact from './Contact'
import License from './License'

class Info extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { info } = props
    this.optionalFields = {
      description: () => <Input defaultValue={info.description} onChange={e => { this.form.description = e.target.value }} />,
      termsOfService: () => <Input defaultValue={info.termsOfService} onChange={e => { this.form.termsOfService = e.target.value }} />,
      contact: () => <Contact contact={info.contact} />,
      license: () => <License license={info.license} />

    }
    this.defaultValues = {
      description: '',
      termsOfService: '',
      contact: {},
      license: { name: '' }
    }
  }

  render () {
    const { info } = this.props
    return (
      <Card title='Info'>
        <Form.Item label='Title' {...inputLayout}>
          <Input defaultValue={info.title} onChange={e => { this.form.title = e.target.value }} />
        </Form.Item>
        <Form.Item label='Version' {...inputLayout}>
          <Input defaultValue={info.version} onChange={e => { this.form.version = e.target.value }} />
        </Form.Item>
        <Form.Item label='Optional fields' {...inputLayout}>
          {R.keys(this.optionalFields).map(name => {
            return <Checkbox checked={info[name] !== undefined} key={name} onChange={e => {
              if (e.target.checked) {
                info.update(name, this.defaultValues[name])
              } else {
                info.update(name, undefined)
                delete this.form[name]
              }
            }}>{name}</Checkbox>
          })}
        </Form.Item>
        { R.toPairs(this.optionalFields).map(([name, component]) => info[name] === undefined ? null : (
          <Form.Item label={name} {...inputLayout} key={name}>
            {component()}
          </Form.Item>
        )) }
        <Form.Item {...buttonLayout}>
          <Button onClick={() => info.replace(this.form)} type='primary'><Icon type='save' /> Save</Button>
        </Form.Item>
      </Card>
    )
  }
}

export default observer(Info)
