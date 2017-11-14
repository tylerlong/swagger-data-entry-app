/* eslint-env jest */
import * as R from 'ramda'

import swaggers from './swaggers'
import Swagger from '../src/web/models/Swagger'
import { removeUnexpectedProps, toAndFromJson } from '../src/web/utils'

test('Snapshot testing', () => {
  R.forEach(doc => {
    const swagger = Swagger.create({
      swagger: '2.0',
      info: {
        title: 'title',
        description: 'description',
        version: 'version',
        contact: {},
        license: {}
      },
      host: 'platform.ringcentral.com',
      schemes: ['https'],
      basePath: '/restapi',
      produces: ['application/json'],
      tags: [],
      'x-auth-required': true,
      'x-service-version': 'v1',
      'x-service-interface': 'rest',
      'x-service-name': 'pas',
      'x-internal-api': false,
      'x-blacklisting-strategy': 'Off',
      'x-metered-api': true,
      'x-metering-group': 'System',
      'x-unkown-field': 'hello',
      paths: {},
      definitions: {}
    })

    swagger.update('swagger', doc.swagger)
    expect(swagger.swagger).toBe(doc.swagger)

    swagger.update('info', doc.info)
    expect(swagger.info.toJSON()).toEqual(doc.info)

    swagger.update('host', doc.host)
    expect(swagger.host).toBe(doc.host)

    swagger.update('schemes', doc.schemes)
    expect(swagger.schemes.toJSON()).toEqual(doc.schemes)

    swagger.update('basePath', doc.basePath)
    expect(swagger.basePath).toBe(doc.basePath)

    swagger.update('produces', doc.produces)
    expect(swagger.produces.toJSON()).toEqual(doc.produces)

    swagger.update('tags', doc.tags)
    expect(swagger.tags.toJSON()).toEqual(doc.tags)

    swagger.update('x-auth-required', doc['x-auth-required'])
    expect(swagger['x-auth-required']).toBe(doc['x-auth-required'])

    swagger.update('x-service-version', doc['x-service-version'])
    expect(swagger['x-service-version']).toBe(doc['x-service-version'])

    swagger.update('x-service-interface', doc['x-service-interface'])
    expect(swagger['x-service-interface']).toBe(doc['x-service-interface'])

    swagger.update('x-service-name', doc['x-service-name'])
    expect(swagger['x-service-name']).toBe(doc['x-service-name'])

    swagger.update('x-internal-api', doc['x-internal-api'])
    expect(swagger['x-internal-api']).toBe(doc['x-internal-api'])

    swagger.update('x-blacklisting-strategy', doc['x-blacklisting-strategy'])
    expect(swagger['x-blacklisting-strategy']).toBe(doc['x-blacklisting-strategy'])

    swagger.update('x-metered-api', doc['x-metered-api'])
    expect(swagger['x-metered-api']).toBe(doc['x-metered-api'])

    swagger.update('x-metering-group', doc['x-metering-group'])
    expect(swagger['x-metering-group']).toBe(doc['x-metering-group'])

    swagger.update('paths', doc.paths)
    let expected = removeUnexpectedProps(doc.paths,
      [],
      [{}] // responses.200.headers
    )
    let actual = toAndFromJson(swagger.paths.toJSON())
    expect(actual).toEqual(expected)

    swagger.update('definitions', doc.definitions)
    expected = removeUnexpectedProps(doc.definitions,
      ['xml'], // xml attribute will be removed from the spec
      [{}] // messaging.yml & call-log.yml entity.properties
    )
    actual = toAndFromJson(swagger.definitions.toJSON())
    expect(actual).toEqual(expected)
  }, swaggers)
})
