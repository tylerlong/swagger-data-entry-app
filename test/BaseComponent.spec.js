/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import * as R from 'ramda'

import BaseComponent from '../src/web/components/BaseComponent'

class MyComponent extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <button onClick={e => { this.setStateProp('a', 'b') }}>Button #0</button>
        <button onClick={e => { this.setStateProp('c', 'd', 'e') }}>Button #1</button>
        <button onClick={e => { this.setStateProp('a', 'b', 'c', R.append('d')) }}>Button #2</button>
        <button onClick={e => { this.setStateProp('a', 'b', 'c', R.append('e')) }}>Button #3</button>
      </div>
    )
  }
}

describe('BaseComponent', () => {
  test('set', () => {
    const wrapper = shallow(<MyComponent />)
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.state()).toEqual({ a: 'b' })
    wrapper.find('button').at(1).simulate('click')
    expect(wrapper.state()).toEqual({ a: 'b', c: { d: 'e' } })
  })

  test('add', () => {
    const wrapper = shallow(<MyComponent />)
    wrapper.find('button').at(2).simulate('click')
    expect(wrapper.state()).toEqual({ a: { b: { c: ['d'] } } })
    wrapper.find('button').at(3).simulate('click')
    expect(wrapper.state()).toEqual({ a: { b: { c: ['d', 'e'] } } })
  })
})
