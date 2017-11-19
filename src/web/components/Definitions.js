import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button, Icon, Popconfirm, Input, Form } from 'antd'
import uuidv1 from 'uuid/v1'
import * as R from 'ramda'

import Schema from './Schema'
import { inputLayout } from '../utils'

class Definitions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      models: this.getModels()
    }
  }

  getModels () {
    const { swagger } = this.props
    if (swagger.definitions === undefined) {
      return []
    }
    return R.pipe(
      R.keys,
      R.map(name => ({
        uuid: uuidv1(),
        name,
        schema: swagger.definitions.get(name)
      })),
      R.sortBy(R.prop('name'))
    )(swagger.definitions.toJSON())
  }

  getDefinitions () {
    return R.pipe(
      R.map(model => ([model.name, model.schema.toJSON()])),
      R.fromPairs
    )(this.state.models)
  }

  render () {
    const { swagger } = this.props
    let models = null
    if (this.state.models.length > 0) {
      models = <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setState({ activeKey: targetKey }) }}>
        {this.state.models.map(model => (
          <Collapse.Panel header={model.name} key={model.uuid}>
            <Popconfirm placement='top' title='Are you sure?' onConfirm={() => { this.setState({ models: R.reject(m => m.uuid === model.uuid, this.state.models) }) }} okText='Yes' cancelText='No'>
              <Button type='danger'><Icon type='delete' /> Delete</Button>
            </Popconfirm>
            <Form.Item label='Name' {...inputLayout}>
              <Input defaultValue={model.name} onChange={e => {
                this.state.models[R.findIndex(R.propEq('uuid', model.uuid), this.state.models)].name = e.target.value
              }} />
            </Form.Item>
            <Schema schema={model.schema} />
          </Collapse.Panel>))}
      </Collapse>
    }
    return (
      <Card title='Definitions'>
        {models}
        <div style={{ marginTop: '16px' }}>
          <Button onClick={e => {
            const uuid = uuidv1()
            this.setState({
              activeKey: uuid,
              models: R.append({ uuid, name: 'ModelName', schema: {} }, this.state.models)
            })
          }}><Icon type='plus' />Add</Button>
          <Button type='primary' onClick={e => {
            swagger.update('definitions', this.getDefinitions())
            this.setState({ models: this.getModels() })
          }}><Icon type='save' />Save</Button>
        </div>
      </Card>
    )
  }
}

export default observer(Definitions)
