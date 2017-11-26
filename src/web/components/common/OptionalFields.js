import React from 'react'
import { Checkbox, Tooltip, Icon, Table } from 'antd'
import * as R from 'ramda'
import { observer } from 'mobx-react'

class OptionalFields extends React.Component {
  render () {
    const { optionalFields, defaultValues, model, form, tooltips } = this.props
    const columns = [
      {
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        className: 'form-label',
        render: (text, record, index) => {
          if (tooltips && tooltips[text]) {
            return <span><Tooltip title={tooltips[text]}><Icon type='question-circle-o' /></Tooltip> {text}</span>
          } else {
            return text
          }
        }
      },
      {
        dataIndex: 'component',
        key: 'component',
        width: '85%'
      }
    ]
    const dataSource = R.pipe(
      R.toPairs,
      R.reject(([name, component]) => model[name] === undefined),
      R.map(([name, component]) => ({ name, component: component(), key: name })),
      R.prepend({ name: 'Optional Fields',
        key: 'optionalFields',
        component: R.keys(optionalFields).map(name => {
          return (
            <Checkbox checked={model[name] !== undefined} key={name} onChange={e => {
              if (e.target.checked) {
                model.update(name, form[name] || defaultValues[name]) // restore
                delete form[name]
              } else {
                form[name] = model[name].toJSON ? model[name].toJSON() : model[name] // backup
                model.update(name, undefined)
              }
            }}>{name}</Checkbox>
          )
        })
      })
    )(optionalFields)
    return <Table dataSource={dataSource} columns={columns} pagination={false} showHeader={false} bordered={false} />
  }
}

export default observer(OptionalFields)
