import React from 'react'
import { Input, Icon, Button, Card } from 'antd'
import { getParent } from 'mobx-state-tree'
import { observer } from 'mobx-react'

import RequiredFields from '../common/RequiredFields'
import OptionalFields from '../common/OptionalFields'
import Property from '../definitions/Property'
import Examples from './Examples'

class Response extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { name, response } = props
    this.requiredFields = {
      name: <Input defaultValue={name} onChange={e => { this.form.name = e.target.value }} />,
      description: <Input defaultValue={response.description} onChange={e => { this.form.description = e.target.value }} />
    }
    if (!name) {
      delete this.requiredFields.name
    }
    this.optionalFields = {
      schema: () => <Card><Property property={response.schema} /></Card>,
      examples: () => <Examples examples={response.examples} />
    }
    this.defaultValues = {
      schema: {},
      examples: {}
    }
    this.tooltips = {
      name: 'Such as "default", "200", "404"...'
    }
  }

  render () {
    const { name, response } = this.props
    return (
      <div>
        <Button onClick={() => {
          response.replace(this.form)
          if (name && this.form.name) {
            getParent(getParent(response)).renameResponse(name, this.form.name)
          }
        }}><Icon type='save' /> Save</Button>
        <RequiredFields
          requiredFields={this.requiredFields}
          tooltips={this.tooltips} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={response}
          form={this.form} />
      </div>
    )
  }
}

export default observer(Response)
