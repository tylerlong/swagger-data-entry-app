import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button } from 'antd'

class Info extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    this.onSave = this.onSave.bind(this)
  }
  onSave () {
    const { info } = this.props
    info.update('title', this.form.title)
    info.update('version', this.form.version)
  }
  render () {
    const { info } = this.props
    return (
      <Card title='Info'>
        <Input defaultValue={info.title} onChange={e => { this.form.title = e.target.value }} />
        <Input defaultValue={info.version} onChange={e => { this.form.version = e.target.value }} />
        <Button onClick={this.onSave}>Save</Button>
      </Card>
    )
  }
}

export default observer(Info)
