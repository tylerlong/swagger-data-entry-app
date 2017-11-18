import React from 'react'
import { observer } from 'mobx-react'
import { Card, Collapse } from 'antd'

class Definitions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Card title='Definitions'>
        <Collapse accordion>
          <Collapse.Panel header='hello header' key='1'>hello</Collapse.Panel>
          <Collapse.Panel header='world header' key='2'>world</Collapse.Panel>
        </Collapse>
      </Card>
    )
  }
}

export default observer(Definitions)
