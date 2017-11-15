import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button } from 'antd'

class Info extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
  }

  render () {
    const { info } = this.props
    return (
      <Card title='Info'>
        <Input defaultValue={info.title} onChange={e => { this.form.title = e.target.value }} />
        <Input defaultValue={info.version} onChange={e => { this.form.version = e.target.value }} />
        <Button onClick={() => this.props.info.replace(this.form)}>Save</Button>
      </Card>
    )
  }
}

export default observer(Info)
