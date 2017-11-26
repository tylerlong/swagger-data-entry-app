import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button, Icon, Popconfirm } from 'antd'
import { getParent } from 'mobx-state-tree'
import uuidv1 from 'uuid/v1'
import * as R from 'ramda'

import Response from './Response'
import BaseComponent from '../common/BaseComponent'

class Responses extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { responses } = this.props
    return (
      <Card>
        <Button style={{ marginBottom: '16px' }} onClick={e => {
          const uuid = uuidv1()
          getParent(responses).newResponse(uuid)
          this.setStateProp('activeKey', uuid)
        }}><Icon type='plus' />Add</Button>
        {responses.size < 1 ? null : (
          <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setStateProp('activeKey', targetKey) }}>
            {R.sortBy(R.prop(0), responses.entries()).map(([name, response]) => {
              const deleteButton = <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                onConfirm={() => getParent(responses).removeResponse(name)} onClick={e => e.stopPropagation()}>
                <Button style={{ marginLeft: '8px' }} type='danger' size='small'><Icon type='delete' />Delete</Button>
              </Popconfirm>
              return <Collapse.Panel header={<span>{name} {deleteButton}</span>} key={name}>
                <Response name={name} response={response} />
              </Collapse.Panel>
            })}
          </Collapse>
        )}
      </Card>
    )
  }
}

export default observer(Responses)
