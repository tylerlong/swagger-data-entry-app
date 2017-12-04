/* eslint-env jest */
import * as R from 'ramda'

import swaggers from './swaggers'
import Swagger from '../src/web/models/Swagger'
import { removeUnexpectedProps, toAndFromJson, wrapExtensionFields, unwrapExtensionFields } from '../src/web/utils'

describe('Snapshot testing', () => {
  test('Test the whole doc', () => {
    R.forEach(doc => {
      const swagger = Swagger.create(wrapExtensionFields(doc))
      const expected = removeUnexpectedProps(doc,
        ['xml'], // xml attribute will be removed from the spec
        [{}] // messaging.yml & call-log.yml entity.properties
      )
      let actual = unwrapExtensionFields(toAndFromJson(swagger))
      actual = removeUnexpectedProps(actual, [], [{}]) // remove afterCreate() created properties
      expect(actual).toEqual(expected)
    }, swaggers)
  })
})
