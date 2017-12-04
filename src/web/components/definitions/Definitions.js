import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button, Icon, Popconfirm } from 'antd'
import { getParent } from 'mobx-state-tree'
import uuidv1 from 'uuid/v1'
import * as R from 'ramda'

import Schema from './Schema'
import BaseComponent from '../common/BaseComponent'

class Definitions extends BaseComponent {
  render () {
    const { definitions } = this.props
    const parent = getParent(definitions)
    const buttons = <Button style={{ marginBottom: '16px' }} onClick={e => {
      const uuid = uuidv1()
      parent.newDefinition(uuid)
      parent.setActiveDefinition(uuid)
    }}><Icon type='plus' />Add</Button>
    return (
      <Card title='Definitions'>
        {buttons}
        {definitions.size < 1 ? null : (
          <Collapse style={{ marginBottom: '16px' }} accordion activeKey={parent.activeDefinition} onChange={targetKey => { parent.setActiveDefinition(targetKey) }}>
            {R.sortBy(R.prop(0), definitions.entries()).map(([name, schema]) => {
              const deleteButton = <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                onConfirm={() => { parent.removeDefinition(name) }}
                onClick={e => e.stopPropagation()}>
                <Button style={{ marginLeft: '8px' }} type='danger' size='small'><Icon type='delete' />Delete</Button>
              </Popconfirm>
              return <Collapse.Panel header={<span>{name} {deleteButton}</span>} key={name}>
                <Schema name={name} schema={schema} />
              </Collapse.Panel>
            })}
          </Collapse>
        )}
        {buttons}
      </Card>
    )
  }
}

export default observer(Definitions)
