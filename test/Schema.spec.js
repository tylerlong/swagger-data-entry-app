/* eslint-env jest */
import Schema from '../src/web/models/definitions/Schema'

describe('Schema', () => {
  test('Create empty schema', () => {
    const schema = Schema.create({
      type: 'object',
      properties: {
        legType: {
          type: 'string',
          description: 'Leg type'
        },
        type: {
          type: 'string',
          description: 'Type of message attachment',
          enum: ['hello', 'world']
        },
        to: {
          type: 'array',
          items: {
            $ref: '#/definitions/CallerInfo'
          }
        }
      }
    })

    expect(schema.type).toBe('object')
    expect(schema.properties.get('legType').type).toBe('string')
    expect(schema.properties.get('legType').description).toBe('Leg type')

    expect(schema.properties.get('type').type).toBe('string')
    expect(schema.properties.get('type').description).toBe('Type of message attachment')
    expect(schema.properties.get('type').enum.toJSON()).toEqual(['hello', 'world'])

    expect(schema.properties.get('to').type).toBe('array')
    expect(schema.properties.get('to').items.$ref).toBe('#/definitions/CallerInfo')
  })
})
