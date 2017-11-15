/* eslint-env jest */
import path from 'path'

import swaggerStore from '../src/web/models/swaggerStore'

describe('swaggerStore', () => {
  test('open swagger spec', () => {
    expect(swaggerStore.swaggerFiles.length).toBe(0)
    const filePath = path.join(__dirname, 'fixtures', 'rc-platform-address-book.yml')
    swaggerStore.openSwaggerFile(filePath)
    expect(swaggerStore.swaggerFiles.length).toBe(1)
    const swaggerFile = swaggerStore.swaggerFiles[0]
    expect(swaggerFile.filePath).toBe(filePath)
    expect(swaggerFile.swagger.swagger).toBe('2.0')
  })

  test('create swagger spec', () => {

  })
})
