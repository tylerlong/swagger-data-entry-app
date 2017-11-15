/* eslint-env jest */
import swaggerStore from '../src/web/models/swaggerStore'
import docs from './swaggers'

describe('swaggerStore', () => {
  test('open swagger spec', () => {
    expect(swaggerStore.size).toBe(0)
    swaggerStore.loadSwagger('~/platform-public.yml', docs[0])
    expect(swaggerStore.size).toBe(1)
    const [key, swagger] = swaggerStore.swaggers.entries()[0]
    expect(key).toBe('~/platform-public.yml')
    expect(swagger.swagger).toBe('2.0')
  })

  test('create swagger spec', () => {

  })
})
