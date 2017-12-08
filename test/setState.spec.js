/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'

import BaseComponent from '../src/web/components/common/BaseComponent'

class Component1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      a: {
        b: 'b',
        c: 'c'
      }
    }
  }
  render () {
    return (
      <div>
        <button onClick={e => { this.setState({ a: { b: '2' } }) }}>Button #0</button>
      </div>
    )
  }
}

class Component2 extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      a: {
        b: 'b',
        c: 'c'
      }
    }
  }
  render () {
    return (
      <div>
        <button onClick={e => { this.setStateProp('a', 'b', '2') }}>Button #0</button>
      </div>
    )
  }
}

describe('setState', () => {
  test('React.Component', () => {
    const wrapper = shallow(<Component1 />)
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.state()).toEqual({
      a: {
        b: '2'
      }
    })
  })

  // todo: setStateProp overrides other props， so...
  test('BaseComponent', () => {
    const wrapper = shallow(<Component2 />)
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.state()).toEqual({ // `a.c` is deleted
      a: {
        b: '2'
      }
    })
  })
})
