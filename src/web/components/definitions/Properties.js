import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button, Icon, Popconfirm } from 'antd'
import { getParent } from 'mobx-state-tree'
import uuidv1 from 'uuid/v1'
import * as R from 'ramda'

import Property from './Property'
import BaseComponent from '../common/BaseComponent'

class Properties extends BaseComponent {
  render () {
    const { properties } = this.props
    const parent = getParent(properties)
    const buttons = <Button style={{ marginBottom: '16px' }} onClick={e => {
      const uuid = uuidv1()
      parent.newProperty(uuid)
      parent.setActiveProperty(uuid)
    }}><Icon type='plus' />Add</Button>
    return (
      <Card>
        {buttons}
        {properties.size < 1 ? null : (
          <Collapse accordion activeKey={parent.activeProperty} onChange={targetKey => { parent.setActiveProperty(targetKey) }}>
            {R.sortBy(R.prop(0), properties.entries()).map(([name, property]) => {
              const deleteButton = <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                onConfirm={() => parent.removeProperty(name)} onClick={e => e.stopPropagation()}>
                <Button style={{ marginLeft: '8px' }} type='danger' size='small'><Icon type='delete' />Delete</Button>
              </Popconfirm>
              return <Collapse.Panel header={<span>{name} {deleteButton}</span>} key={name}>
                <Property name={name} property={property} />
              </Collapse.Panel>
            })}
          </Collapse>
        )}
        {buttons}
      </Card>
    )
  }
}

export default observer(Properties)
