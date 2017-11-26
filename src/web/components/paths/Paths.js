import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Popconfirm, Button, Icon } from 'antd'
import * as R from 'ramda'
import { getParent } from 'mobx-state-tree'
import uuidv1 from 'uuid/v1'

import PathItem from './PathItem'
import BaseComponent from '../common/BaseComponent'

class Paths extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { paths } = this.props
    return (
      <Card title='Paths'>
        <Button style={{ marginBottom: '16px' }} onClick={e => {
          const uuid = uuidv1()
          getParent(paths).newPath(uuid)
          this.setStateProp('activeKey', uuid)
        }}><Icon type='plus' />Add</Button>
        {paths.size < 1 ? null : (
          <Collapse accordion activeKey={this.state.activeKey}
            onChange={targetKey => { this.setStateProp('activeKey', targetKey) }}>
            {R.sortBy(R.prop(0), paths.entries()).map(([name, pathItem]) => {
              const deleteButton = <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                onConfirm={() => { getParent(paths).removePath(name) }}
                onClick={e => e.stopPropagation()}>
                <Button style={{ marginLeft: '8px' }} type='danger' size='small'><Icon type='delete' />Delete</Button>
              </Popconfirm>
              return <Collapse.Panel header={<span>{name} {deleteButton}</span>} key={name}>
                <PathItem name={name} pathItem={pathItem} />
              </Collapse.Panel>
            })}
          </Collapse>
        )}
      </Card>
    )
  }
}

export default observer(Paths)
