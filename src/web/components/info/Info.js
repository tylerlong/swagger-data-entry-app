import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button, Form, Icon } from 'antd'

import { inputLayout } from '../../utils'
import Contact from './Contact'
import License from './License'
import OptionalFields from '../common/OptionalFields'

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
        <Button onClick={() => info.replace(this.form)}><Icon type='save' /> Save</Button>
        <Form.Item label='Title' {...inputLayout}>
          <Input defaultValue={info.title} onChange={e => { this.form.title = e.target.value }} />
        </Form.Item>
        <Form.Item label='Version' {...inputLayout}>
          <Input defaultValue={info.version} onChange={e => { this.form.version = e.target.value }} />
        </Form.Item>
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={info}
          form={this.form} />
      </Card>
    )
  }
}

export default observer(Info)
