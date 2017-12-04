import React from 'react'
import { observer } from 'mobx-react'
import { Button, Icon, Input } from 'antd'
import { getParent } from 'mobx-state-tree'

import OptionalFields from '../common/OptionalFields'
import Extensions from '../common/Extensions'
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
      get: () => <Operation operation={pathItem.get} />,
      post: () => <Operation operation={pathItem.post} />,
      put: () => <Operation operation={pathItem.put} />,
      delete: () => <Operation operation={pathItem.delete} />,
      head: () => <Operation operation={pathItem.head} />,
      'x-extension-fields': () => <Extensions extensionFields={pathItem['x-extension-fields']} />
    }
    this.defaultValues = {
      get: { responses: { default: { description: 'OK' } } },
      post: { responses: { default: { description: 'OK' } } },
      put: { responses: { default: { description: 'OK' } } },
      delete: { responses: { default: { description: 'OK' } } },
      head: { responses: { default: { description: 'OK' } } },
      'x-extension-fields': {}
    }
    this.tooltips = {
    }
  }

  render () {
    const { name, pathItem } = this.props
    const buttons = <Button onClick={e => {
      pathItem.replace(this.form)
      if (this.form.name) {
        getParent(getParent(pathItem)).renamePath(name, this.form.name)
      }
    }}><Icon type='save' />Save</Button>
    return (
      <div>
        {buttons}
        <RequiredFields
          requiredFields={this.requiredFields}
          tooltips={this.tooltips} />
        <OptionalFields
          optionalFields={this.optionalFields}
          defaultValues={this.defaultValues}
          model={pathItem}
          form={this.form}
          tooltips={this.tooltips} />
        {buttons}
      </div>
    )
  }
}

export default observer(PathItem)
