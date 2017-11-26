import React from 'react'
import { Card, Table, Button, Icon, Input, Popconfirm } from 'antd'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'
import { getParent } from 'mobx-state-tree'
import { observer } from 'mobx-react'

import BaseComponent from './BaseComponent'

class Extension extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = this.getState()
    this.columns = [
      {
        dataIndex: 'name',
        width: '25%',
        render: (text, record, index) => {
          return <Input placeholder='x-key' value={text} onChange={e => { this.setStateProp('dataSource', index, 'name', e.target.value) }} />
        }
      },
      {
        dataIndex: 'value',
        width: '50%',
        render: (text, record, index) => {
          return <Input placeholder='value' value={text} onChange={e => { this.setStateProp('dataSource', index, 'value', e.target.value) }} />
        }
      },
      {
        width: '25%',
        render: (text, record, index) => {
          return <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
            onConfirm={() => { this.setStateProp('dataSource', R.remove(index, 1)) }}>
            <Button type='danger'><Icon type='delete' /> Delete</Button>
          </Popconfirm>
        }
      }
    ]
  }

  getState () {
    return {
      dataSource: R.sortBy(R.prop('name'))(this.props.extensionFields.entries().map(([k, v]) => ({
        key: uuidv1(),
        name: k,
        value: v
      })))
    }
  }

  normalizedKVs () {
    return this.state.dataSource.map(item => {
      let key = item.name
      if (!key.startsWith('x-')) {
        key = `x-${item.name}`
      }
      let value = item.value
      if (value === 'true' || value === 'yes') {
        value = true
      } else if (value === 'false' || value === 'no') {
        value = false
      }
      return [key, value]
    })
  }

  render () {
    return (
      <Card>
        <Table showHeader={false} size='middle' dataSource={this.state.dataSource} columns={this.columns} pagination={this.state.dataSource.length > 10 ? {} : false} />
        <div style={{ marginTop: 16 }}>
          <Button onClick={e => { this.setStateProp('dataSource', R.append({ key: uuidv1(), name: '', value: '' })) }}>
            <Icon type='plus' />Add
          </Button>
          <Button onClick={e => {
            getParent(this.props.extensionFields).replaceExtensionFields(this.normalizedKVs()) // sync state to store
            this.setState(this.getState()) // sync store to state
          }}><Icon type='save' />Save</Button>
          <ul style={{ marginTop: '8px' }}>
            <li><Icon type='pushpin' /> "x-" will be prepended to keys if you forget to do so</li>
            <li><Icon type='pushpin' /> "true", "yes", "false" and "no" will be converted to booleans</li>
          </ul>
        </div>
      </Card>
    )
  }
}

export default observer(Extension)
