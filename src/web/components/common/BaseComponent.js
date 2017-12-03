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
      const newState = R.set(R.lensPath(R.init(arguments)), value, this.state)
      const shortIndex = R.findIndex(item => typeof item === 'number', arguments)
      const shortPath = R.lensPath(R.slice(0, shortIndex, arguments))
      const delta = R.set(shortPath, R.view(shortPath, newState), {})
      this.setState(delta)
    } else {
      this.setState(R.set(R.lensPath(R.init(arguments)), value, {}))
    }
  }
}

export default BaseComponent
