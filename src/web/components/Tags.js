import React from 'react'
import { Card, Input, Popconfirm, Button, Table } from 'antd'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'

import BaseComponent from './BaseComponent'

class Tags extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = this.getState()
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '25%',
        render: (text, record, index) => {
          return <Input placeholder='name' value={text} onChange={e => { this.setStateProp('dataSource', index, 'name', e.target.value) }} />
        }
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '50%',
        render: (text, record, index) => {
          return <Input placeholder='description' value={text} onChange={e => { this.setStateProp('dataSource', index, 'description', e.target.value) }} />
        }
      },
      {
        title: 'Delete',
        width: '25%',
        render: (text, record, index) => {
          return <Popconfirm placement='top' title='Are you sure?' onConfirm={() => { this.setState({ dataSource: R.remove(index, 1, this.state.dataSource) }) }} okText='Yes' cancelText='No'>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        }
      }
    ]
  }

  getState () {
    return {
      dataSource: (this.props.swagger.tags || []).map(tag => ({
        key: uuidv1(),
        name: tag.name,
        description: tag.description
      }))
    }
  }

  render () {
    return <Card title='Tags'>
      <Table size='middle' dataSource={this.state.dataSource} columns={this.columns} pagination={this.state.dataSource.length > 10 ? {} : false} />
    </Card>
  }
}

export default Tags
