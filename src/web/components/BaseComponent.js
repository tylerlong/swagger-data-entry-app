import React from 'react'
import * as R from 'ramda'

class BaseComponent extends React.Component {
  setStateProp () {
    if (this.state === undefined || arguments.length < 2) {
      return
    }
    let value = R.last(arguments)
    if (typeof value === 'function') {
      value = value(R.view(R.lensPath(R.init(arguments)), this.state))
    }
    const delta = R.set(R.lensPath(R.init(arguments)), value, {})
    this.setState(delta)
  }
}

export default BaseComponent
