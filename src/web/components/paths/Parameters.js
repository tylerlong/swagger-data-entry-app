import React from 'react'
import { Card, Button, Icon, Collapse, Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import { getParent } from 'mobx-state-tree'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'

import Parameter from './Parameter'
import BaseComponent from '../common/BaseComponent'

class Parameters extends BaseComponent {
  render () {
    const { parameters } = this.props
    const parent = getParent(parameters)
    const buttons = <Button style={{ marginBottom: '16px' }} onClick={e => {
      const uuid = uuidv1()
      parent.newParameter(uuid)
      parent.setActiveParameter(uuid)
    }}><Icon type='plus' />Add</Button>
    return (
      <Card>
        {buttons}
        {parameters.size < 1 ? null : (
          <Collapse style={{ marginBottom: '16px' }} accordion activeKey={parent.activeParameter} onChange={targetKey => { parent.setActiveParameter(targetKey) }}>
            {R.sortBy(R.prop('name'), parameters).map(parameter => {
              const deleteButton = <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                onConfirm={() => parent.removeParameter(parameter.name)} onClick={e => e.stopPropagation()}>
                <Button style={{ marginLeft: '8px' }} type='danger' size='small'><Icon type='delete' />Delete</Button>
              </Popconfirm>
              return <Collapse.Panel header={<span>{parameter.name} {deleteButton}</span>} key={parameter.name}>
                <Parameter parameter={parameter} />
              </Collapse.Panel>
            })}
          </Collapse>
        )}
        {buttons}
      </Card>
    )
  }
}

export default observer(Parameters)
