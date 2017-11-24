import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Popconfirm, Button, Icon } from 'antd'
import { getParent } from 'mobx-state-tree'
import uuidv1 from 'uuid/v1'

import Property from './Property'
import BaseComponent from './BaseComponent'

class Properties extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { properties } = this.props
    return (
      <Card title='Properties'>
        {properties.size < 1 ? null : (
          <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setStateProp('activeKey', targetKey) }}>
            {properties.entries().map(([name, property]) => (
              <Collapse.Panel header={name} key={name}>
                <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                  onConfirm={() => { getParent(properties).removeProperty(name) }}>
                  <Button type='danger'><Icon type='delete' /> Delete</Button>
                </Popconfirm>
                <Property name={name} property={property} />
              </Collapse.Panel>
            ))}
          </Collapse>
        )}
        <div style={{ marginTop: '16px' }}>
          <Button onClick={e => {
            const uuid = uuidv1()
            getParent(properties).newProperty(uuid)
            this.setStateProp('activeKey', uuid)
          }}><Icon type='plus' />Add</Button>
        </div>
      </Card>
    )
  }
}

export default observer(Properties)
