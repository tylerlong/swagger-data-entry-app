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
    if (R.any(item => typeof item === 'number', R.init(args))) { // array structure involved
      const newState = R.set(R.lensPath(R.init(args)), value, this.state)
      const shortIndex = R.findIndex(item => typeof item === 'number', args)
      const shortPath = R.lensPath(R.slice(0, shortIndex, args))
      const delta = R.set(shortPath, R.view(shortPath, newState), {})
      this.setState(delta)
    } else {
      this.setState(R.set(R.lensPath(R.init(args)), value, {}))
    }
  }
}

export default BaseComponent
