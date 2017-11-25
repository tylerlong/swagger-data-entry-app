import React from 'react'
import { observer } from 'mobx-react'
import * as R from 'ramda'
import { Form } from 'antd'

import { inputLayout } from '../../utils'

class RequiredFields extends React.Component {
  render () {
    const { requiredFields } = this.props
    return R.toPairs(requiredFields).map(([name, component]) => {
      return (
        <Form.Item label={name} {...inputLayout} key={name}>
          {component}
        </Form.Item>
      )
    })
  }
}

export default observer(RequiredFields)
