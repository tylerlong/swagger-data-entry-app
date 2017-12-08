import React from 'react'
import * as R from 'ramda'

class BaseComponent extends React.Component {
  setStateProp (...args) {
    if (this.state === undefined || args.length < 2) {
      return
    }
    let value = R.last(args)
    if (typeof value === 'function') {
      value = value(R.view(R.lensPath(R.init(args)), this.state))
    }
    const newState = R.set(R.lensPath(R.init(args)), value, this.state)
    this.setState({ [args[0]]: newState[args[0]] })
  }
}

export default BaseComponent
