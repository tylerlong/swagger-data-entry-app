import React from 'react'
import { Input, Icon, Button, Select, Checkbox, InputNumber, Card } from 'antd'
import { getParent } from 'mobx-state-tree'
import { observer } from 'mobx-react'

import RequiredFields from '../common/RequiredFields'
import OptionalFields from '../common/OptionalFields'
import { primitiveTypes } from '../../utils'

class Property extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { name, property } = props
    this.requiredFields = {}
    if (name) {
      this.requiredFields.name = <Input defaultValue={name} onChange={e => { this.form.name = e.target.value }} />
    }
    this.optionalFields = {
      $ref: () => <Input defaultValue={property.$ref} onChange={e => { this.form.$ref = e.target.value }} />,
      type: () => (
        <Select defaultValue={property.type} style={{ width: '100%' }}
          onChange={value => { this.form.type = value }}>
          {primitiveTypes.map(type => <Select.Option value={type} key={type}>{type}</Select.Option>)}
        </Select>
      ),
      format: () => <Input defaultValue={property.format} onChange={e => { this.form.format = e.target.value }} />,
      description: () => <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} defaultValue={property.description} onChange={e => { this.form.description = e.target.value }} />,
      enum: () => <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
        defaultValue={property.enum.toJSON()} onChange={value => { this.form.enum = value }} />,
      default: () => <Input defaultValue={property.default} onChange={e => {
        let value = e.target.value
        if (value === 'true' || value === 'yes') {
          value = true
        } else if (value === 'false' || value === 'no') {
          value = false
        }
        this.form.default = value
      }} />,
      readOnly: () => <Checkbox defaultChecked={property.readOnly} onChange={e => { this.form.readOnly = e.target.checked }} />,
      maxLength: () => <InputNumber min={0} defaultValue={1000} onChange={value => { this.form.maxLength = value }} />,
      minLength: () => <InputNumber min={0} defaultValue={0} onChange={value => { this.form.minLength = value }} />,
      pattern: () => <Input defaultValue={property.pattern} onChange={e => { this.form.pattern = e.target.value }} />,
      items: () => <Card><Property property={property.items} /></Card>,
      additionalProperties: () => <Card><Property property={property.additionalProperties} /></Card>
    }
    this.defaultValues = {
      $ref: '',
      type: 'string',
      format: '',
      description: '',
      enum: [],
      default: '',
      readOnly: false,
      maxLength: 1000,
      minLength: 0,
      pattern: '',
      items: {},
      additionalProperties: {}
    }
    this.tooltips = {
      default: '"true", "yes", "false" and "no" will be converted to boolean'
    }
  }

  render () {
    const { name, property } = this.props
    return (
      <div>
        <Button onClick={() => {
          property.replace(this.form)
          if (name && this.form.name) {
            getParent(getParent(property)).renameProperty(name, this.form.name)
          }
        }}><Icon type='save' /> Save</Button>
        <RequiredFields requiredFields={this.requiredFields} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={property}
          form={this.form}
          tooltips={this.tooltips} />
      </div>
    )
  }
}

export default observer(Property)
