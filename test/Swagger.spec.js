/* eslint-env jest */
import Swagger from '../src/web/models/Swagger'
import Info from '../src/web/models/Info'
import Contact from '../src/web/models/Contact'
import License from '../src/web/models/License'

describe('Swagger', () => {
  test('Create swagger', () => {
    const swagger = Swagger.create({
      swagger: '2.0',
      info: Info.create({
        title: 'title',
        description: 'description',
        version: 'version',
        contact: Contact.create(),
        license: License.create()
      }),
      schemes: ['https'],
      produces: ['application/json'],
      tags: [],
      paths: {},
      definitions: {}
    })

    expect(swagger.swagger).toBe('2.0')
  })
})
