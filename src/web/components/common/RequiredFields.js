import React from 'react'
import { observer } from 'mobx-react'
import * as R from 'ramda'
import { Form, Tooltip, Icon } from 'antd'

import { inputLayout } from '../../utils'

class RequiredFields extends React.Component {
  render () {
    const { requiredFields, tooltips } = this.props
    return R.toPairs(requiredFields).map(([name, component]) => {
      let label = name
      if (tooltips && tooltips[name]) {
        label = <Tooltip title={tooltips[name]}><Icon type='question-circle' /> {name}</Tooltip>
      }
      return (
        <Form.Item label={label} {...inputLayout} key={name}>
          {component}
        </Form.Item>
      )
    })
  }
}

export default observer(RequiredFields)
