import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Popconfirm, Button, Icon } from 'antd'
import * as R from 'ramda'
import { getParent } from 'mobx-state-tree'
import uuidv1 from 'uuid/v1'

import PathItem from './PathItem'
import BaseComponent from '../common/BaseComponent'

class Paths extends BaseComponent {
  render () {
    const { paths } = this.props
    const parent = getParent(paths)
    return (
      <Card title='Paths'>
        <Button style={{ marginBottom: '16px' }} onClick={e => {
          const uuid = uuidv1()
          parent.newPath(uuid)
          parent.setActivePath(uuid)
        }}><Icon type='plus' />Add</Button>
        {paths.size < 1 ? null : (
          <Collapse accordion activeKey={parent.activePath}
            onChange={targetKey => { parent.setActivePath(targetKey) }}>
            {R.sortBy(R.prop(0), paths.entries()).map(([name, pathItem]) => {
              const deleteButton = <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
                onConfirm={() => { parent.removePath(name) }}
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
