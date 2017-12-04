import React from 'react'
import { observer } from 'mobx-react'
import { Select, Card, Button, Icon, Input, Checkbox } from 'antd'

import OptionalFields from '../common/OptionalFields'
import RequiredFields from '../common/RequiredFields'
import Extensions from '../common/Extensions'
import Parameters from './Parameters'
import Responses from './Responses'

class Operation extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { operation } = props
    this.requiredFields = {
      responses: <Responses responses={operation.responses} />
    }
    this.optionalFields = {
      tags: () => <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
        defaultValue={operation.tags.toJSON()} onChange={value => { this.form.tags = value }} />,
      summary: () => <Input defaultValue={operation.summary} onChange={e => { this.form.summary = e.target.value }} />,
      description: () => <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} defaultValue={operation.description} onChange={e => { this.form.description = e.target.value }} />,
      operationId: () => <Input defaultValue={operation.operationId} onChange={e => { this.form.operationId = e.target.value }} />,
      deprecated: () => <Checkbox defaultChecked={operation.deprecated} onChange={e => { this.form.deprecated = e.target.checked }} />,
      consumes: () => <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
        defaultValue={operation.consumes.toJSON()} onChange={value => { this.form.consumes = value }} />,
      produces: () => <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
        defaultValue={operation.produces.toJSON()} onChange={value => { this.form.produces = value }} />,
      'x-extension-fields': () => <Extensions extensionFields={operation['x-extension-fields']} />,
      parameters: () => <Parameters parameters={operation.parameters} />
    }
    this.defaultValues = {
      tags: [],
      summary: '',
      description: '',
      operationId: '',
      consumes: [],
      produces: [],
      'x-extension-fields': {},
      parameters: []
    }
  }

  render () {
    const { operation } = this.props
    const buttons = <Button onClick={() => operation.replace(this.form)}><Icon type='save' /> Save</Button>
    return (
      <Card>
        {buttons}
        <RequiredFields requiredFields={this.requiredFields} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={operation}
          form={this.form}
          tooltips={this.tooltips} />
        {buttons}
      </Card>
    )
  }
}

export default observer(Operation)
