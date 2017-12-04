import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button, Icon } from 'antd'

import Contact from './Contact'
import License from './License'
import OptionalFields from '../common/OptionalFields'
import RequiredFields from '../common/RequiredFields'

class Info extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { info } = props
    this.requiredFields = {
      title: <Input defaultValue={info.title} onChange={e => { this.form.title = e.target.value }} />,
      version: <Input defaultValue={info.version} onChange={e => { this.form.version = e.target.value }} />
    }
    this.optionalFields = {
      description: () => <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} defaultValue={info.description} onChange={e => { this.form.description = e.target.value }} />,
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
    const buttons = <Button onClick={() => info.replace(this.form)}><Icon type='save' /> Save</Button>
    return (
      <Card title='Info'>
        {buttons}
        <RequiredFields requiredFields={this.requiredFields} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={info}
          form={this.form} />
        {buttons}
      </Card>
    )
  }
}

export default observer(Info)
