import React from 'react'
import { Card, Table, Button, Icon, Input, Popconfirm } from 'antd'
import * as R from 'ramda'

import BaseComponent from './BaseComponent'

class Extension extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [
        {
          key: 'x-aaa',
          value: 'bbb'
        },
        {
          key: 'x-ccc',
          value: false
        }
      ]
    }
    this.columns = [this.keyColumn(), this.valueColumn(), this.deleteColumn()]
  }

  keyColumn () {
    return {
      title: 'Key',
      dataIndex: 'key',
      width: '25%',
      render: (text, record, index) => {
        return <Input value={text} onChange={e => { this.setStateProp('dataSource', index, 'key', e.target.value) }} />
      }
    }
  }

  valueColumn () {
    return {
      title: 'Value',
      dataIndex: 'value',
      width: '50%',
      render: (text, record, index) => {
        return <Input value={text} onChange={e => { this.setStateProp('dataSource', index, 'value', e.target.value) }} />
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

  render () {
    return (
      <Card>
        <Table size='middle' dataSource={this.state.dataSource} columns={this.columns} pagination={this.state.dataSource.length > 10 ? {} : false} />
        <div style={{ marginTop: 16 }}>
          <Button onClick={e => { this.setState({ dataSource: R.append({ name: '', type: 'string', value: '' }, this.state.dataSource) }) }}><Icon type='plus' />Add</Button>
          <Button><Icon type='save' />Save</Button>
        </div>
      </Card>
    )
  }
}

export default Extension
