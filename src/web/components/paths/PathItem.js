import React from 'react'
import { observer } from 'mobx-react'
import { Button, Icon, Input } from 'antd'
import { getParent } from 'mobx-state-tree'

import OptionalFields from '../common/OptionalFields'
import Extension from '../common/Extension'
import RequiredFields from '../common/RequiredFields'
import Operation from './Operation'

class PathItem extends React.Component {
  constructor (props) {
    super(props)
    const { name, pathItem } = props
    this.form = {}
    this.requiredFields = {
      name: <Input defaultValue={name} onChange={e => { this.form.name = e.target.value }} />
    }
    this.optionalFields = {
      get: () => <Operation />,
      post: () => <Operation />,
      put: () => <Operation />,
      delete: () => <Operation />,
      head: () => <Operation />,
      'x-extension-fields': () => <Extension extensionFields={pathItem['x-extension-fields']} />
    }
    this.defaultValues = {
      get: { responses: {} },
      post: { responses: {} },
      put: { responses: {} },
      delete: { responses: {} },
      head: { responses: {} },
      'x-extension-fields': {}
    }
    this.tooltips = {
    }
  }

  render () {
    const { name, pathItem } = this.props
    return (
      <div>
        <Button onClick={e => {
          pathItem.replace(this.form)
          if (this.form.name) {
            getParent(getParent(pathItem)).renameDefinition(name, this.form.name)
          }
        }}><Icon type='save' />Save</Button>
        <RequiredFields
          requiredFields={this.requiredFields}
          tooltips={this.tooltips} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={pathItem}
          form={this.form}
          tooltips={this.tooltips} />
      </div>
    )
  }
}

export default observer(PathItem)
