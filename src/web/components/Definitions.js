import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button, Icon } from 'antd'
import uuidv1 from 'uuid/v1'
import * as R from 'ramda'

import Schema from './Schema'

class Definitions extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.getState()
  }

  getState () {
    const { swagger } = this.props
    if (swagger.definitions === undefined) {
      return { models: [] }
    }
    return {
      models: R.pipe(
        R.sort,
        R.map(name => ({
          uuid: uuidv1(),
          name,
          schema: swagger[name]
        }))
      )(swagger.definitions.keys)
    }
  }

  render () {
    let models = null
    if (this.state.models.length > 0) {
      models = <Collapse accordion activeKey={this.state.activeKey} onChange={targetKey => { this.setState({ activeKey: targetKey }) }}>
        {this.state.models.map(model => (
          <Collapse.Panel header={model.name} key={model.uuid}>
            <Schema schema={model.schema} />
          </Collapse.Panel>))}
      </Collapse>
    }
    return (
      <Card title='Definitions'>
        { models }
        <div style={{ marginTop: '16px' }}>
          <Button onClick={e => {
            const uuid = uuidv1()
            this.setState({
              activeKey: uuid,
              models: R.append({ uuid, name: 'ModelName', schema: {} }, this.state.models)
            })
          }}><Icon type='plus' />Add</Button>
          <Button type='primary'><Icon type='save' />Save</Button>
        </div>
      </Card>
    )
  }
}

export default observer(Definitions)
