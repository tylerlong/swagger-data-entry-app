import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button, Icon, Popconfirm } from 'antd'
import { getParent } from 'mobx-state-tree'
import uuidv1 from 'uuid/v1'

import Schema from './Schema'
import BaseComponent from '../common/BaseComponent'

class Definitions extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { definitions } = this.props
    return (
      <Card title='Definitions'>
        {definitions.size < 1 ? null : (
          <Collapse accordion activeKey={this.state.activeKey}
            onChange={targetKey => { this.setStateProp('activeKey', targetKey) }}>
            {definitions.entries().map(([name, schema]) => (
              <Collapse.Panel header={name} key={name}>
                <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                  onConfirm={() => { getParent(definitions).removeDefinition(name) }} >
                  <Button type='danger'><Icon type='delete' /> Delete</Button>
                </Popconfirm>
                <Schema name={name} schema={schema} />
              </Collapse.Panel>))}
          </Collapse>
        )}
        <div style={{ marginTop: '16px' }}>
          <Button onClick={e => {
            const uuid = uuidv1()
            getParent(definitions).newDefinition(uuid)
            this.setStateProp('activeKey', uuid)
          }}><Icon type='plus' />Add</Button>
        </div>
      </Card>
    )
  }
}

export default observer(Definitions)