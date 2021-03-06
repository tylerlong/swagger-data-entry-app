import React from 'react'
import { Input, Icon, Button, Select, Checkbox, InputNumber, Card } from 'antd'
import { getParent } from 'mobx-state-tree'
import { observer } from 'mobx-react'

import RequiredFields from '../common/RequiredFields'
import OptionalFields from '../common/OptionalFields'
import { primitiveTypes, normalizeValue } from '../../utils'
import swaggerStore from '../../models/swaggerStore'

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
      $ref: () => (
        <Select defaultValue={property.$ref} style={{ width: '100%' }}
          onChange={value => { this.form.$ref = value }}>
          {swaggerStore.definitionNames.map(name => <Select.Option value={`#/definitions/${name}`} key={name}>{`#/definitions/${name}`}</Select.Option>)}
        </Select>
      ),
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
        let value = normalizeValue(e.target.value)
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
      default: '"true/yes/false/no" will be converted to boolean and "123", "0.45"...etc will be converted to number.'
    }
  }

  render () {
    const { name, property } = this.props
    const buttons = <Button onClick={() => {
      property.replace(this.form)
      if (name && this.form.name) {
        getParent(getParent(property)).renameProperty(name, this.form.name)
      }
    }}><Icon type='save' /> Save</Button>
    return (
      <div>
        {buttons}
        <RequiredFields requiredFields={this.requiredFields} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={property}
          form={this.form}
          tooltips={this.tooltips} />
        {buttons}
      </div>
    )
  }
}

export default observer(Property)
