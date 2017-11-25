import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Form, Button, Icon } from 'antd'

import { inputLayout } from '../../utils'
import OptionalFields from '../common/OptionalFields'

class License extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { license } = this.props
    this.optionalFields = {
      url: () => <Input defaultValue={license.url} onChange={e => { this.form.url = e.target.value }} />
    }
    this.defaultValues = {
      url: ''
    }
  }

  render () {
    const { license } = this.props
    return (
      <Card>
        <Form>
          <Button onClick={() => license.replace(this.form)}><Icon type='save' /> Save</Button>
          <Form.Item label='Name' {...inputLayout}>
            <Input defaultValue={license.name} onChange={e => { this.form.name = e.target.value }} />
          </Form.Item>
          <OptionalFields
            optionalFields={this.optionalFields}
            defaultValues={this.defaultValues}
            model={license}
            form={this.form} />
        </Form>
      </Card>
    )
  }
}

export default observer(License)
