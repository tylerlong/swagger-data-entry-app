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
    if (R.any(item => typeof item === 'number', R.init(arguments))) { // array structure involved
      this.setState(R.set(R.lensPath(R.init(arguments)), value, this.state))
      // todo: make the line above more efficient
    } else {
      this.setState(R.set(R.lensPath(R.init(arguments)), value, {}))
    }
  }
}

export default BaseComponent
