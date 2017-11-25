import React from 'react'
import { Form, Checkbox } from 'antd'
import * as R from 'ramda'
import { observer } from 'mobx-react'

import { inputLayout } from '../../utils'

class OptionalFields extends React.Component {
  render () {
    const { optionalFields, defaultValues, model, form } = this.props
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
      R.toPairs(optionalFields).map(([name, component]) => model[name] === undefined ? null : (
        <Form.Item label={name} {...inputLayout} key={name}>
          {component()}
        </Form.Item>
      ))
    ]
  }
}

export default observer(OptionalFields)
