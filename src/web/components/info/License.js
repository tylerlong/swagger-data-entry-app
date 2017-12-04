import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button, Icon } from 'antd'

import OptionalFields from '../common/OptionalFields'
import RequiredFields from '../common/RequiredFields'

class License extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { license } = this.props
    this.requiredFields = {
      name: <Input defaultValue={license.name} onChange={e => { this.form.name = e.target.value }} />
    }
    this.optionalFields = {
      url: () => <Input defaultValue={license.url} onChange={e => { this.form.url = e.target.value }} />
    }
    this.defaultValues = {
      url: ''
    }
  }

  render () {
    const { license } = this.props
    const button = <Button onClick={() => license.replace(this.form)}><Icon type='save' /> Save</Button>
    return (
      <Card>
        {button}
        <RequiredFields requiredFields={this.requiredFields} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={license}
          form={this.form} />
        {button}
      </Card>
    )
  }
}

export default observer(License)
