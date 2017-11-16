import React from 'react'
import { Card, Table, Button, Icon, Input, Radio } from 'antd'
import * as R from 'ramda'

import BaseComponent from './BaseComponent'

class Extension extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [
        {
          key: 'x-aaa',
          type: 'string',
          value: 'bbb'
        },
        {
          key: 'x-ccc',
          type: 'boolean',
          value: false
        }
      ]
    }
    this.columns = [this.keyColumn(), this.typeColumn(), this.valueColumn()]
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

  typeColumn () {
    return {
      title: 'Type',
      dataIndex: 'type',
      width: '25%',
      render: (text, record, index) => {
        return <Radio.Group onChange={e => { this.setStateProp('dataSource', index, 'type', e.target.value) }} value={text}>
          <Radio.Button value='string'>string</Radio.Button>
          <Radio.Button value='boolean'>boolean</Radio.Button>
        </Radio.Group>
      }
    }
  }

  valueColumn () {
    return {
      title: 'Value',
      dataIndex: 'value',
      width: '50%',
      render: (text, record, index) => {
        const type = this.getStateProp('dataSource', index, 'type')
        if (type === 'string') {
          return <Input value={text} onChange={e => { this.setStateProp('dataSource', index, 'value', e.target.value) }} />
        }
        if (type === 'boolean') {
          return <Radio.Group onChange={e => { this.setStateProp('dataSource', index, 'value', e.target.value) }} value={text}>
            <Radio.Button value>true</Radio.Button>
            <Radio.Button value={false}>false</Radio.Button>
          </Radio.Group>
        }
        throw new Error(`Unknown type ${type}`)
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
