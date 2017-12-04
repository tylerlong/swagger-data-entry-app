import React from 'react'
import { Card, Table, Button, Icon, Input } from 'antd'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'
import { getParent } from 'mobx-state-tree'
import { observer } from 'mobx-react'

import BaseComponent from './BaseComponent'
import { normalizeValue } from '../../utils'

class Extensions extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = this.fromStore()
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '25%',
        render: (text, record, index) => {
          return <Input placeholder='x-name' value={text} onChange={e => { this.setStateProp('dataSource', index, 'name', e.target.value) }} />
        }
      },
      {
        title: 'Value',
        dataIndex: 'value',
        width: '75%',
        render: (text, record, index) => {
          return <Input placeholder='value' value={text} onChange={e => { this.setStateProp('dataSource', index, 'value', e.target.value) }} />
        }
      }
    ]
  }

  fromStore () {
    return {
      dataSource: R.sortBy(R.prop('name'))(this.props.extensionFields.entries().map(([name, value]) => ({
        key: uuidv1(),
        name,
        value
      })))
    }
  }

  toStore () {
    return R.pipe(
      R.reject(item => R.isEmpty(R.trim(item.name))),
      R.map(item => {
        let name = R.trim(item.name)
        if (!name.startsWith('x-')) {
          name = `x-${item.name}`
        }
        let value = normalizeValue(item.value)
        return [name, value]
      })
    )(this.state.dataSource)
  }

  render () {
    return (
      <Card>
        <Button onClick={e => { this.setStateProp('dataSource', R.append({ key: uuidv1(), name: '', value: '' })) }}>
          <Icon type='plus' />Add
        </Button>
        <Button onClick={e => {
          getParent(this.props.extensionFields).replaceExtensionFields(this.toStore()) // sync state to store
          this.setState(this.fromStore()) // sync store to state
        }}><Icon type='save' />Save</Button>
        <Table style={{ marginTop: '16px' }} size='middle' dataSource={this.state.dataSource} columns={this.columns} pagination={false} />
        <ul style={{ marginTop: '8px' }}>
          <li><Icon type='pushpin' /> "x-" will be prepended to names if you forget to do so</li>
          <li><Icon type='pushpin' /> Clear a row and save to delete it</li>
          <li><Icon type='pushpin' /> "true", "yes", "false" and "no" will be converted to booleans</li>
          <li><Icon type='pushpin' /> "123", "0.45"...etc will be converted to numbers</li>
        </ul>
      </Card>
    )
  }
}

export default observer(Extensions)
