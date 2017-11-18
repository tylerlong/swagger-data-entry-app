import React from 'react'
import { observer } from 'mobx-react'
import { Card } from 'antd'

class Definitions extends React.Component {
  render () {
    return (
      <Card title='Definitions'>
        Definitions
      </Card>
    )
  }
}

export default observer(Definitions)
