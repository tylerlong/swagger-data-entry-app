import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button, Icon, Popconfirm } from 'antd'
import { getParent } from 'mobx-state-tree'
import uuidv1 from 'uuid/v1'
import * as R from 'ramda'

import Response from './Response'
import BaseComponent from '../common/BaseComponent'

class Responses extends BaseComponent {
  render () {
    const { responses } = this.props
    const parent = getParent(responses)
    return (
      <Card>
        <Button style={{ marginBottom: '16px' }} onClick={e => {
          const uuid = uuidv1()
          parent.newResponse(uuid)
          parent.setActiveResponse(uuid)
        }}><Icon type='plus' />Add</Button>
        {responses.size < 1 ? null : (
          <Collapse accordion activeKey={parent.activeResponse} onChange={targetKey => { parent.setActiveResponse(targetKey) }}>
            {R.sortBy(R.prop(0), responses.entries()).map(([name, response]) => {
              const deleteButton = <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                onConfirm={() => parent.removeResponse(name)} onClick={e => e.stopPropagation()}>
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
