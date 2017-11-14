/* eslint-env jest */
import Swagger from '../src/web/models/Swagger'

describe('Swagger', () => {
  test('Create swagger', () => {
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
      tags: [
        {
          name: 'name1',
          unexpected: 'title' // unexpected attribute
        },
        {
          name: 'name2'
        }
      ],
      'x-auth-required': true,
      'x-service-version': 'v1',
      'x-service-interface': 'rest',
      'x-service-name': 'pas',
      'x-internal-api': false,
      'x-blacklisting-strategy': 'Off',
      'x-metered-api': true,
      'x-metering-group': 'System',
      'x-unkown-field': 'hello',
      paths: {
        '/v1.0/account/{accountId}/extension/{extensionId}/sms': {
          'x-request-max-body-size': '10m'
        }
      },
      definitions: {}
    })

    expect(swagger.swagger).toBe('2.0')
    expect(swagger.host).toBe('platform.ringcentral.com')

    expect(swagger.schemes.toJSON()).toEqual(['https'])
    expect(swagger.schemes.length).toBe(1)
    expect(swagger.schemes[0]).toBe('https')

    expect(swagger.basePath).toBe('/restapi')

    expect(swagger.produces.toJSON()).toEqual(['application/json'])
    expect(swagger.produces.length).toBe(1)
    expect(swagger.produces[0]).toBe('application/json')

    expect(swagger.tags.length).toBe(2)
    expect(swagger.tags[0].name).toBe('name1')
    expect(swagger.tags[0].unexpected).toBe(undefined)
    expect(swagger.tags[1].name).toBe('name2')

    expect(swagger['x-auth-required']).toBe(true)
    expect(swagger['x-service-version']).toBe('v1')
    expect(swagger['x-service-interface']).toBe('rest')
    expect(swagger['x-service-name']).toBe('pas')
    expect(swagger['x-internal-api']).toBe(false)
    expect(swagger['x-blacklisting-strategy']).toBe('Off')
    expect(swagger['x-metered-api']).toBe(true)
    expect(swagger['x-metering-group']).toBe('System')
    expect(swagger['x-unknown-field']).toBe(undefined)

    expect(swagger.paths.get('/v1.0/account/{accountId}/extension/{extensionId}/sms')['x-request-max-body-size']).toBe('10m')
    expect(swagger.paths.get('/v1.0/account/{accountId}/extension/{extensionId}/sms').get).toBe(undefined)
    expect(swagger.paths.get('/v1.0/account/{accountId}/extension/{extensionId}/sms').post).toBe(undefined)
    expect(swagger.paths.get('/v1.0/account/{accountId}/extension/{extensionId}/sms').put).toBe(undefined)
    expect(swagger.paths.get('/v1.0/account/{accountId}/extension/{extensionId}/sms').delete).toBe(undefined)

    swagger.paths.get('/v1.0/account/{accountId}/extension/{extensionId}/sms').update('x-request-max-body-size', '20m')
    expect(swagger.paths.get('/v1.0/account/{accountId}/extension/{extensionId}/sms')['x-request-max-body-size']).toBe('20m')
  })
})
