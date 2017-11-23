import React from 'react'
import * as R from 'ramda'

class BaseComponent extends React.Component {
  getStateProp () {
    if (this.state === undefined || arguments.length === 0) {
      return undefined
    }
    return R.view(R.lensPath(arguments), this.state)
  }

  setStateProp () {
    if (this.state === undefined || arguments.length < 2) {
      return
    }
    const lastArgument = R.last(arguments)
    if (typeof lastArgument === 'function') {
      this.setState(R.over(R.lensPath(R.init(arguments)), lastArgument, this.state))
    } else {
      this.setState(R.set(R.lensPath(R.init(arguments)), lastArgument, this.state))
    }
  }
}

export default BaseComponent
