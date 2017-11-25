import React from 'react'
import { observer } from 'mobx-react'
import { Input, Card, Form, Button, Icon, Checkbox } from 'antd'
import * as R from 'ramda'

import { inputLayout, buttonLayout } from '../../utils'

class License extends React.Component {
  constructor (props) {
    super(props)
    this.form = {}
    const { license } = this.props
    this.optionalFields = {
      url: () => <Input defaultValue={license.url} onChange={e => { this.form.url = e.target.value }} />
    }
    this.defaultValues = {
      url: ''
    }
  }

  render () {
    const { license } = this.props
    return (
      <Card>
        <Form>
          <Form.Item label='Name' {...inputLayout}>
            <Input defaultValue={license.name} onChange={e => { this.form.name = e.target.value }} />
          </Form.Item>
          <Form.Item label='Optional fields' {...inputLayout}>
            {R.keys(this.optionalFields).map(name => {
              return <Checkbox checked={license[name] !== undefined} key={name} onChange={e => {
                if (e.target.checked) {
                  license.update(name, this.defaultValues[name])
                } else {
                  license.update(name, undefined)
                  delete this.form[name]
                }
              }}>{name}</Checkbox>
            })}
          </Form.Item>
          { R.toPairs(this.optionalFields).map(([name, component]) => license[name] === undefined ? null : (
            <Form.Item label={name} {...inputLayout} key={name}>
              {component()}
            </Form.Item>
          )) }
          <Form.Item {...buttonLayout}>
            <Button onClick={() => license.replace(this.form)} type='primary'><Icon type='save' /> Save</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default observer(License)
