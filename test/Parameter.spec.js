/* eslint-env jest */
import Parameter from '../src/web/models/paths/Parameter'

describe('Parameter', () => {
  test('Create parameter', () => {
    const parameter = Parameter.create({
      name: 'accountId',
      in: 'path',
      description: 'Internal identifier of a RingCentral account or tilde (~)',
      required: true,
      type: 'string',
      default: '~'
    })
    expect(parameter.name).toBe('accountId')
    expect(parameter.in).toBe('path')
    expect(parameter.description).toBe('Internal identifier of a RingCentral account or tilde (~)')
    expect(parameter.required).toBe(true)
    expect(parameter.type).toBe('string')
    expect(parameter.default).toBe('~')
  })

  test('Create body Parameter', () => {
    const parameter = Parameter.create({
      name: 'body',
      in: 'body',
      description: 'JSON body',
      required: true,
      schema: {
        $ref: '#/definitions/CreateSMSMessage'
      }
    })
    expect(parameter.name).toBe('body')
    expect(parameter.in).toBe('body')
    expect(parameter.description).toBe('JSON body')
    expect(parameter.required).toBe(true)
    expect(parameter.schema.$ref).toBe('#/definitions/CreateSMSMessage')
  })
})
