/* eslint-env jest */
import * as R from 'ramda'

import swaggers from './swaggers'
import Info from '../src/web/models/Info'

test('Snapshot testing', () => {
  R.forEach(swagger => {
    expect(swagger.swagger).toBe('2.0')

    const info = Info.create(swagger.info)
    expect(info.toJSON()).toEqual(swagger.info)
  }, swaggers)
})
