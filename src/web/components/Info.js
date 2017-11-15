import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Button, Form } from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}

class Info extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
  }

  render () {
    const { info } = this.props
    return (
      <Card title='Info'>
        <Form.Item label='Title' {...formItemLayout}>
          <Input defaultValue={info.title} onChange={e => { this.form.title = e.target.value }} />
        </Form.Item>
        <Form.Item label='Version' {...formItemLayout}>
          <Input defaultValue={info.version} onChange={e => { this.form.version = e.target.value }} />
        </Form.Item>
        <Form.Item label='Description' {...formItemLayout}>
          <Input defaultValue={info.description} onChange={e => { this.form.description = e.target.value }} />
        </Form.Item>
        <Form.Item label='Terms of Service' {...formItemLayout}>
          <Input defaultValue={info.termsOfService} onChange={e => { this.form.termsOfService = e.target.value }} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 }
          }}
        >
          <Button onClick={() => this.props.info.replace(this.form)}>Save</Button>
        </Form.Item>
      </Card>
    )
  }
}

export default observer(Info)
