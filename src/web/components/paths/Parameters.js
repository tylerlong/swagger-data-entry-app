import React from 'react'
import { Card, Button, Icon, Collapse, Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import { getParent } from 'mobx-state-tree'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'

import Parameter from './Parameter'
import BaseComponent from '../common/BaseComponent'

class Parameters extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { parameters } = this.props
    return (
      <Card>
        <Button style={{ marginBottom: '16px' }} onClick={e => {
          const uuid = uuidv1()
          getParent(parameters).newParameter(uuid)
          this.setStateProp('activeKey', uuid)
        }}><Icon type='plus' />Add</Button>
        {parameters.size < 1 ? null : (
          <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setStateProp('activeKey', targetKey) }}>
            {R.sortBy(R.prop('name'), parameters).map(parameter => {
              const deleteButton = <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                onConfirm={() => getParent(parameters).removeParameter(parameter.name)} onClick={e => e.stopPropagation()}>
                <Button style={{ marginLeft: '8px' }} type='danger' size='small'><Icon type='delete' />Delete</Button>
              </Popconfirm>
              return <Collapse.Panel header={<span>{parameter.name} {deleteButton}</span>} key={parameter.name}>
                <Parameter parameter={parameter} />
              </Collapse.Panel>
            })}
          </Collapse>
        )}
      </Card>
    )
  }
}

export default observer(Parameters)
