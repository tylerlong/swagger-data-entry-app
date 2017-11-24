/* eslint-env jest */
import Response from '../src/web/models/paths/Response'

describe('Response', () => {
  test('Create response', () => {
    const response = Response.create({
      description: 'Success',
      schema: {
        $ref: '#/definitions/'
      }
    })

    expect(response.description).toBe('Success')
    expect(response.schema.$ref).toBe('#/definitions/')
  })
})
