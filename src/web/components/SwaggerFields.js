import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button, Select, Icon } from 'antd'

import Extension from './common/Extension'
import RequiredFields from './common/RequiredFields'
import OptionalFields from './common/OptionalFields'

class SwaggerFields extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { swagger } = props
    this.requiredFields = {
      swagger: <Input defaultValue='2.0' disabled />
    }
    this.optionalFields = {
      host: () => <Input defaultValue={swagger.host} onChange={e => { this.form.host = e.target.value }} />,
      schemes: () => (
        <Select mode='multiple' defaultValue={swagger.schemes.toJSON()} style={{ width: '100%' }}
          onChange={value => { this.form.schemes = value }}>
          <Select.Option value='https'>https</Select.Option>
          <Select.Option value='http'>http</Select.Option>
          <Select.Option value='ws'>ws</Select.Option>
          <Select.Option value='wss'>wss</Select.Option>
        </Select>
      ),
      basePath: () => <Input defaultValue={swagger.basePath} onChange={e => { this.form.basePath = e.target.value }} />,
      consumes: () => <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
        defaultValue={swagger.consumes.toJSON()}
        onChange={value => { this.form.consumes = value }} />,
      produces: () => <Select placeholder='Input some text then press enter' mode='tags' style={{ width: '100%' }}
        defaultValue={swagger.produces.toJSON()}
        onChange={value => { this.form.produces = value }} />,
      'x-extension-fields': () => <Extension extensionFields={swagger['x-extension-fields']} />
    }
    this.defaultValues = {
      host: '',
      schemes: [],
      basePath: '',
      consumes: [],
      produces: [],
      'x-extension-fields': {}
    }
    this.tooltips = {
      swagger: 'Must be "2.0"'
    }
  }

  render () {
    const { swagger } = this.props
    return (
      <Card title='Swagger'>
        <Button onClick={() => swagger.replace(this.form)}><Icon type='save' /> Save</Button>
        <RequiredFields
          requiredFields={this.requiredFields}
          tooltips={this.tooltips} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={swagger}
          form={this.form}
          tooltips={this.tooltips} />
      </Card>
    )
  }
}

export default observer(SwaggerFields)
