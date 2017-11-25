import React from 'react'
import { Card, Input, Popconfirm, Button, Table, Icon } from 'antd'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'
import { observer } from 'mobx-react'
import { getParent } from 'mobx-state-tree'

import BaseComponent from '../common/BaseComponent'

class Tags extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = this.fromStore()
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
          return <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
            onConfirm={() => { this.setStateProp('dataSource', R.remove(index, 1)) }}>
            <Button type='danger'><Icon type='delete' /> Delete</Button>
          </Popconfirm>
        }
      }
    ]
  }

  fromStore () {
    return {
      dataSource: R.sortBy(R.prop('name'))((this.props.tags || []).map(tag => ({
        key: uuidv1(),
        name: tag.name,
        description: tag.description
      })))
    }
  }

  toStore () {
    return R.pipe(
      R.reverse,
      R.uniqBy(item => item.name),
      R.reject(item => R.isNil(item.name) || R.isEmpty(item.name)),
      R.reverse,
      R.map(item => R.assoc('description', R.isEmpty(item.description) ? undefined : item.description, item))
    )(this.state.dataSource)
  }

  render () {
    return <Card title='Tags'>
      <Table size='middle' dataSource={this.state.dataSource} columns={this.columns} pagination={this.state.dataSource.length > 10 ? {} : false} />
      <div style={{ marginTop: 16 }}>
        <Button onClick={e => { this.setStateProp('dataSource', R.append({ key: uuidv1(), name: '', value: '' })) }}>
          <Icon type='plus' />Add
        </Button>
        <Button onClick={e => {
          getParent(this.props.tags).update('tags', this.toStore()) // sync state to store
          this.setState(this.fromStore()) // sync store to state
        }}>
          <Icon type='save' />Save
        </Button>
      </div>
    </Card>
  }
}

export default observer(Tags)
