import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button, Icon } from 'antd'
import { getParent } from 'mobx-state-tree'
import uuidv1 from 'uuid/v1'
import * as R from 'ramda'

import Property from './Property'
import BaseComponent from '../common/BaseComponent'

class Properties extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { properties } = this.props
    return (
      <Card>
        {properties.size < 1 ? null : (
          <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setStateProp('activeKey', targetKey) }}>
            {R.sortBy(R.prop(0), properties.entries()).map(([name, property]) => (
              <Collapse.Panel header={name} key={name}>
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
