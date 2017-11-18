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
    this.columns = [this.keyColumn(), this.valueColumn(), this.deleteColumn()]
  }

  getState () {
    return {
      dataSource: this.props.extensionFields.entries().map(([k, v]) => ({
        key: uuidv1(),
        name: k,
        value: v
      }))
    }
  }

  keyColumn () {
    return {
      title: 'Key',
      dataIndex: 'name',
      width: '25%',
      render: (text, record, index) => {
        return <Input placeholder='x-key' value={text} onChange={e => { this.setStateProp('dataSource', index, 'name', e.target.value) }} />
      }
    }
  }

  valueColumn () {
    return {
      title: 'Value',
      dataIndex: 'value',
      width: '50%',
      render: (text, record, index) => {
        return <Input placeholder='value' value={text} onChange={e => { this.setStateProp('dataSource', index, 'value', e.target.value) }} />
      }
    }
  }

  deleteColumn () {
    return {
      title: 'Delete',
      width: '25%',
      render: (text, record, index) => {
        return <Popconfirm placement='top' title='Are you sure?' onConfirm={() => { this.setState({ dataSource: R.remove(index, 1, this.state.dataSource) }) }} okText='Yes' cancelText='No'>
          <Button type='danger'>Delete</Button>
        </Popconfirm>
      }
    }
  }

  normalizedKVs () {
    return this.state.dataSource.map(item => {
      let key = item.name
      if (!key.startsWith('x-')) {
        key = `x-${item.name}`
      }
      let value = item.value
      if (value === 'true') {
        value = true
      } else if (value === 'false') {
        value = false
      }
      return [ key, value ]
    })
  }

  render () {
    return (
      <Card>
        <Table size='middle' dataSource={this.state.dataSource} columns={this.columns} pagination={this.state.dataSource.length > 10 ? {} : false} />
        <div style={{ marginTop: 16 }}>
          <Button onClick={e => { this.setState({ dataSource: R.append({ key: uuidv1(), name: '', value: '' }, this.state.dataSource) }) }}><Icon type='plus' />Add</Button>
          <Button onClick={e => {
            getParent(this.props.extensionFields).replaceExtensionFields(this.normalizedKVs())
            this.setState(this.getState())
          }} ><Icon type='save' />Save</Button>
          <ul>
            <li><Icon type='pushpin' /> "x-" will be prepended to keys if you forget to</li>
            <li><Icon type='pushpin' /> "yes" and "no" values will be converted to boolean</li>
          </ul>
        </div>
      </Card>
    )
  }
}

export default observer(Extension)
