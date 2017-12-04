import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button, Icon } from 'antd'

import OptionalFields from '../common/OptionalFields'

class Contact extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { contact } = this.props
    this.optionalFields = {
      name: () => <Input defaultValue={contact.name} onChange={e => { this.form.name = e.target.value }} />,
      url: () => <Input defaultValue={contact.url} onChange={e => { this.form.url = e.target.value }} />,
      email: () => <Input defaultValue={contact.email} onChange={e => { this.form.email = e.target.value }} />
    }
    this.defaultValues = {
      name: '',
      url: '',
      email: ''
    }
  }

  render () {
    const { contact } = this.props
    const buttons = <Button onClick={() => contact.replace(this.form)}><Icon type='save' /> Save</Button>
    return (
      <Card>
        {buttons}
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={contact}
          form={this.form} />
        {buttons}
      </Card>
    )
  }
}

export default observer(Contact)
