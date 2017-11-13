/* eslint-env jest */
import { getSnapshot } from 'mobx-state-tree'

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
      schemes: ['https'],
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
      paths: {},
      definitions: {}
    })

    expect(swagger.swagger).toBe('2.0')

    expect(getSnapshot(swagger.schemes)).toEqual(['https'])
    expect(swagger.schemes.length).toBe(1)
    expect(swagger.schemes[0]).toBe('https')

    expect(getSnapshot(swagger.produces)).toEqual(['application/json'])
    expect(swagger.produces.length).toBe(1)
    expect(swagger.produces[0]).toBe('application/json')

    expect(swagger.tags.length).toBe(2)
    expect(swagger.tags[0].name).toBe('name1')
    expect(swagger.tags[0].unexpected).toBe(undefined)
    expect(swagger.tags[1].name).toBe('name2')
  })
})
