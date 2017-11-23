import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button, Icon, Popconfirm, Input, Form } from 'antd'
import uuidv1 from 'uuid/v1'
import * as R from 'ramda'
import { getParent } from 'mobx-state-tree'

import Schema from './Schema'
import { inputLayout } from '../utils'
import SchemaModel from '../models/Schema'
import BaseComponent from './BaseComponent'

class Definitions extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      models: this.fromStore()
    }
  }

  fromStore () {
    const { definitions } = this.props
    return R.pipe(
      R.keys,
      R.map(name => ({
        uuid: uuidv1(),
        name,
        schema: definitions.get(name)
      })),
      R.sortBy(R.prop('name'))
    )(definitions.toJSON())
  }

  toStore () {
    return R.pipe(
      R.map(model => ([model.name, model.schema.toJSON()])),
      R.fromPairs
    )(this.state.models)
  }

  render () {
    const { definitions } = this.props
    let models = null
    if (this.state.models.length > 0) {
      models = <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setStateProp('activeKey', targetKey) }}>
        {this.state.models.map((model, index) => (
          <Collapse.Panel header={model.name} key={model.uuid}>
            <Popconfirm placement='top' title='Are you sure?' okText='Yes' cancelText='No'
              onConfirm={() => { this.setStateProp('models', R.remove(index, 1)) }} >
              <Button type='danger'><Icon type='delete' /> Delete</Button>
            </Popconfirm>
            <Form.Item label='Name' {...inputLayout}>
              <Input defaultValue={model.name} onChange={e => { this.state.models[index].name = e.target.value }} />
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
            this.setStateProp('models', R.append({ uuid, name: 'ModelName', schema: SchemaModel.create({}) }))
            this.setStateProp('activeKey', uuid)
          }}><Icon type='plus' />Add</Button>
          <Button type='primary' onClick={e => {
            getParent(definitions).update('definitions', this.toStore()) // sync state to store
            this.setStateProp('models', this.fromStore()) // sync store to state
          }}><Icon type='save' />Save</Button>
        </div>
      </Card>
    )
  }
}

export default observer(Definitions)
