import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse, Button } from 'antd'
import uuidv1 from 'uuid/v1'

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
      models: swagger.definitions.keys.map(name => ({
        uuid: uuidv1(),
        name,
        schema: swagger[name]
      }))
    }
  }

  render () {
    let models = null
    if (this.state.models.length > 0) {
      models = <Collapse accordion>
        {this.state.models.map(model => (
          <Collapse.Panel header={model.name} key={model.uuid}>
            {model.name}
          </Collapse.Panel>))}
      </Collapse>
    }
    return (
      <Card title='Definitions'>
        { models }
        <Button>Add</Button>
        <Button>Save</Button>
      </Card>
    )
  }
}

export default observer(Definitions)
