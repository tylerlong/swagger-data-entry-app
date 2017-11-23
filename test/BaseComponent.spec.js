/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'

import BaseComponent from '../src/web/components/BaseComponent'

class MyComponent extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <button onClick={e => { this.setStateProp('a', 'b') }}>Button #1</button>
        <button onClick={e => { this.setStateProp('c', 'd') }}>Button #1</button>
      </div>
    )
  }
}

describe('BaseComponent', () => {
  test('setStateProp', () => {
    const wrapper = shallow(<MyComponent />)
    wrapper.find('button').at(0).simulate('click')
    console.log(wrapper.state())
    wrapper.find('button').at(1).simulate('click')
    console.log(wrapper.state())
  })
})
