import React from 'react'
import { Input, Select, Button, Icon } from 'antd'
import { getParent } from 'mobx-state-tree'
import { observer } from 'mobx-react'

import Properties from './Properties'
import OptionalFields from '../common/OptionalFields'
import RequiredFields from '../common/RequiredFields'

class Schema extends React.Component {
  constructor (props) {
    super(props)
    const { name, schema } = props
    this.form = {}
    this.requiredFields = {
      name: <Input defaultValue={name} onChange={e => { this.form.name = e.target.value }} />,
      type: <Input value='object' disabled />,
      properties: <Properties properties={schema.properties} />
    }
    this.optionalFields = {
      description: () => <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} defaultValue={schema.description} onChange={e => { this.form.description = e.target.value }} />,
      required: () => (
        <Select mode='multiple' style={{ width: '100%' }}
          defaultValue={schema.required.toJSON()} onChange={value => { this.form.required = value }}>
          {schema.properties.keys().map(name => <Select.Option value={name} key={name}>{name}</Select.Option>)}
        </Select>
      )
    }
    this.defaultValues = {
      description: '',
      required: []
    }
    this.tooltips = {
      type: 'Must be "object"',
      required: 'Which properties are required?'
    }
  }

  render () {
    const { name, schema } = this.props
    return (
      <div>
        <Button onClick={e => {
          schema.replace(this.form)
          if (this.form.name) {
            getParent(getParent(schema)).renameDefinition(name, this.form.name)
          }
        }}><Icon type='save' />Save</Button>
        <RequiredFields
          requiredFields={this.requiredFields}
          tooltips={this.tooltips} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={schema}
          form={this.form}
          tooltips={this.tooltips} />
      </div>
    )
  }
}

export default observer(Schema)
