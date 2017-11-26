import React from 'react'
import { Card, Input, Button, Table, Icon } from 'antd'
import * as R from 'ramda'
import uuidv1 from 'uuid/v1'
import { observer } from 'mobx-react'
import { getParent } from 'mobx-state-tree'

import BaseComponent from '../common/BaseComponent'

class Examples extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = this.fromStore()
    this.columns = [
      {
        title: 'MIME Type',
        dataIndex: 'mimeType',
        width: '25%',
        render: (text, record, index) => {
          return <Input placeholder='MIME Type' value={text} onChange={e => { this.setStateProp('dataSource', index, 'mimeType', e.target.value) }} />
        }
      },
      {
        title: 'Content',
        dataIndex: 'content',
        width: '75%',
        render: (text, record, index) => {
          return <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} placeholder='content' value={text} onChange={e => { this.setStateProp('dataSource', index, 'content', e.target.value) }} />
        }
      }
    ]
  }

  fromStore () {
    return {
      dataSource: this.props.examples.entries().map(([mimeType, content]) => ({
        key: uuidv1(),
        mimeType,
        content
      }))
    }
  }

  toStore () {
    return R.pipe(
      R.reject(item => R.isNil(item.mimeType) || R.isEmpty(item.mimeType)),
      R.uniqBy(item => item.mimeType),
      R.map(item => [item.mimeType, item.content]),
      R.fromPairs
    )(this.state.dataSource)
  }

  render () {
    return <Card title='Examples'>
      <Button onClick={e => { this.setStateProp('dataSource', R.append({ key: uuidv1(), mimeType: '', content: '' })) }}>
        <Icon type='plus' />Add
      </Button>
      <Button onClick={e => {
        getParent(this.props.examples).update('examples', this.toStore()) // sync state to store
        this.setState(this.fromStore()) // sync store to state
      }}>
        <Icon type='save' />Save
      </Button>
      <Table style={{ marginTop: '16px' }} size='middle' dataSource={this.state.dataSource} columns={this.columns} pagination={false} />
      <ul style={{ marginTop: '16px' }}>
        <li><Icon type='pushpin' /> Clear mimeType followed by saving to <span style={{ color: 'red' }}>delete</span> an example</li>
      </ul>
    </Card>
  }
}

export default observer(Examples)
