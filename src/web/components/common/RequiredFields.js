import React from 'react'
import { observer } from 'mobx-react'
import * as R from 'ramda'
import { Tooltip, Icon, Table } from 'antd'

class RequiredFields extends React.Component {
  render () {
    const { requiredFields, tooltips } = this.props
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
    const dataSource = R.toPairs(requiredFields).map(([name, component]) => {
      return { name, component, key: name }
    })
    return <Table dataSource={dataSource} columns={columns} pagination={false} showHeader={false} bordered={false} size='middle' />
  }
}

export default observer(RequiredFields)
