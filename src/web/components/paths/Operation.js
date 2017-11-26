import React from 'react'
import { observer } from 'mobx-react'
import { Select, Card, Button, Icon } from 'antd'

import OptionalFields from '../common/OptionalFields'

class Operation extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { operation } = props
    this.optionalFields = {
      tags: () => <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
        defaultValue={operation.tags.toJSON()} onChange={value => { this.form.tags = value }} />
    }
    this.defaultValues = {
      tags: []
    }
  }

  render () {
    const { operation } = this.props
    return (
      <Card>
        <Button onClick={() => operation.replace(this.form)}><Icon type='save' /> Save</Button>
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={operation}
          form={this.form}
          tooltips={this.tooltips} />
      </Card>
    )
  }
}

export default observer(Operation)
