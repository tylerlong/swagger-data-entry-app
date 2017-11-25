import React from 'react'
import { Form, Checkbox, Tooltip, Icon } from 'antd'
import * as R from 'ramda'
import { observer } from 'mobx-react'

import { inputLayout } from '../../utils'

class OptionalFields extends React.Component {
  render () {
    const { optionalFields, defaultValues, model, form, tooltips } = this.props
    return [
      <Form.Item label='Optional fields' {...inputLayout} key='optional-fields'>
        {R.keys(optionalFields).map(name => {
          return <Checkbox checked={model[name] !== undefined} key={name} onChange={e => {
            if (e.target.checked) {
              model.update(name, defaultValues[name])
            } else {
              model.update(name, undefined)
              delete form[name]
            }
          }}>{name}</Checkbox>
        })}
      </Form.Item>,
      R.toPairs(optionalFields).map(([name, component]) => {
        if (model[name] === undefined) {
          return null
        }
        let label = name
        if (tooltips && tooltips[name]) {
          label = <Tooltip title={tooltips[name]}><Icon type='question-circle' /> {name}</Tooltip>
        }
        return (
          <Form.Item label={label} {...inputLayout} key={name}>
            {component()}
          </Form.Item>
        )
      })
    ]
  }
}

export default observer(OptionalFields)
