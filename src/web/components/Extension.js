import React from 'react'
import { Card, Table, Button, Icon, Input, Popconfirm } from 'antd'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'

import BaseComponent from './BaseComponent'

class Extension extends BaseComponent {
  constructor (props) {
    super(props)
    if (this.props.swagger['x-extension-fields']) {
      this.state = {
        dataSource: this.props.swagger['x-extension-fields'].entries().map(([k, v]) => ({
          key: uuidv1(),
          name: k,
          value: v
        }))
      }
    } else {
      this.state = {
        dataSource: []
      }
    }
    this.columns = [this.keyColumn(), this.valueColumn(), this.deleteColumn()]
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

  render () {
    return (
      <Card>
        <Table size='middle' dataSource={this.state.dataSource} columns={this.columns} pagination={this.state.dataSource.length > 10 ? {} : false} />
        <div style={{ marginTop: 16 }}>
          <Button onClick={e => { this.setState({ dataSource: R.append({ key: uuidv1(), name: '', value: '' }, this.state.dataSource) }) }}><Icon type='plus' />Add</Button>
          <Button onClick={e => {
            console.log('save extensions')
            this.props.swagger.replaceExtensionFields(this.state.dataSource.map(item => ([item.name, item.value])))
          }} ><Icon type='save' />Save</Button>
        </div>
      </Card>
    )
  }
}

export default Extension
