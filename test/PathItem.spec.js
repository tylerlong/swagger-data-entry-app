/* eslint-env jest */
import PathItem from '../src/web/models/PathItem'

describe('PathItem', () => {
  test('Create an empty pathItem', () => {
    const pathItem = PathItem.create()
    expect(pathItem['x-request-max-body-size']).toBe(undefined)
    expect(pathItem.get).toBe(undefined)
    expect(pathItem.post).toBe(undefined)
    expect(pathItem.put).toBe(undefined)
    expect(pathItem.delete).toBe(undefined)
  })

  test('Create a real pathItem', () => {
    const pathItem = PathItem.create({
      'x-request-max-body-size': '10m',
      get: {
        tags: [{ name: 'SMS' }],
        summary: 'summary',
        description: 'description',
        operationId: 'listMessages',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [], // todo: write test
        responses: {}, // todo: write test
        'x-api-group': 'extension/sms',
        'x-throttling-group': 'Light',
        'x-metered-api': true,
        'x-metering-group': 'System',
        'x-app-permission': 'ReadMessages',
        'x-user-permission': 'ReadMessages'
      }
    })
    expect(pathItem['x-request-max-body-size']).toBe('10m')

    expect(pathItem.get.tags.toJSON()).toEqual([{ name: 'SMS' }])
    expect(pathItem.get.consumes.toJSON()).toEqual(['application/json'])
    expect(pathItem.get.produces.toJSON()).toEqual(['application/json'])
    expect(pathItem.get.summary).toEqual('summary')
    expect(pathItem.get.description).toEqual('description')
    expect(pathItem.get.operationId).toEqual('listMessages')
    expect(pathItem.get['x-api-group']).toBe('extension/sms')
    expect(pathItem.get['x-throttling-group']).toBe('Light')
    expect(pathItem.get['x-metered-api']).toBe(true)
    expect(pathItem.get['x-metering-group']).toBe('System')
    expect(pathItem.get['x-app-permission']).toBe('ReadMessages')
    expect(pathItem.get['x-user-permission']).toBe('ReadMessages')

    expect(pathItem.post).toBe(undefined)
    expect(pathItem.put).toBe(undefined)
    expect(pathItem.delete).toBe(undefined)
  })
})
