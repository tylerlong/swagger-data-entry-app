import React from 'react'
import { Input, Icon, Button, Select, Checkbox, InputNumber, Card } from 'antd'
import { observer } from 'mobx-react'

import RequiredFields from '../common/RequiredFields'
import OptionalFields from '../common/OptionalFields'
import { primitiveTypes, parameterIns, collectionFormats, normalizeValue } from '../../utils'
import Property from '../definitions/Property'

class Parameter extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { parameter } = props
    this.requiredFields = {
      name: <Input defaultValue={parameter.name} onChange={e => { this.form.name = e.target.value }} />,
      in: <Select defaultValue={parameter.in} style={{ width: '100%' }} onChange={value => { this.form.in = value }}>
        {parameterIns.map(val => <Select.Option value={val} key={val}>{val}</Select.Option>)}
      </Select>
    }
    this.optionalFields = {
      format: () => <Input defaultValue={parameter.format} onChange={e => { this.form.format = e.target.value }} />,
      description: () => <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} defaultValue={parameter.description} onChange={e => { this.form.description = e.target.value }} />,
      required: () => <Checkbox defaultChecked={parameter.required} onChange={e => { this.form.required = e.target.checked }} />,
      allowEmptyValue: () => <Checkbox defaultChecked={parameter.allowEmptyValue} onChange={e => { this.form.allowEmptyValue = e.target.checked }} />,
      type: () => (
        <Select defaultValue={parameter.type} style={{ width: '100%' }}
          onChange={value => { this.form.type = value }}>
          {primitiveTypes.map(type => <Select.Option value={type} key={type}>{type}</Select.Option>)}
        </Select>
      ),
      enum: () => <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
        defaultValue={parameter.enum.toJSON()} onChange={value => { this.form.enum = value }} />,
      default: () => <Input defaultValue={parameter.default} onChange={e => {
        let value = normalizeValue(e.target.value)
        this.form.default = value
      }} />,
      collectionFormat: () => <Select defaultValue={parameter.collectionFormat} style={{ width: '100%' }}
        onChange={value => { this.form.collectionFormat = value }}>
        {collectionFormats.map(val => <Select.Option value={val} key={val}>{val}</Select.Option>)}
      </Select>,
      maximum: () => <InputNumber defaultValue={1000} onChange={value => { this.form.maximum = value }} />,
      minimum: () => <InputNumber defaultValue={0} onChange={value => { this.form.minimum = value }} />,
      items: () => <Card><Property property={parameter.items} /></Card>,
      schema: () => <Card><Property property={parameter.schema} /></Card>
    }
    this.defaultValues = {
      format: '',
      description: '',
      required: false,
      type: 'string',
      enum: [],
      default: '',
      collectionFormat: 'csv',
      maximum: 1000,
      minimum: 0,
      items: {},
      schema: {}
    }
    this.tooltips = {
      default: '"true/yes/false/no" will be converted to boolean and "123", "0.45"...etc will be converted to number.'
    }
  }

  render () {
    const { parameter } = this.props
    return (
      <div>
        <Button onClick={() => { parameter.replace(this.form) }}><Icon type='save' /> Save</Button>
        <RequiredFields requiredFields={this.requiredFields} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={parameter}
          form={this.form}
          tooltips={this.tooltips} />
      </div>
    )
  }
}

export default observer(Parameter)
