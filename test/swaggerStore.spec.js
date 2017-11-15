/* eslint-env jest */
import path from 'path'
import fs from 'fs'

import swaggerStore from '../src/web/models/swaggerStore'

beforeEach(() => {
  swaggerStore.clear()
})

describe('swaggerStore', () => {
  test('open swagger spec', () => {
    expect(swaggerStore.swaggerFiles.length).toBe(0)
    const filePath = path.join(__dirname, 'fixtures', 'for-testing-only.yml')
    swaggerStore.openSwaggerFile(filePath)
    expect(swaggerStore.swaggerFiles.length).toBe(1)
    const swaggerFile = swaggerStore.swaggerFiles[0]
    expect(swaggerFile.filePath).toBe(filePath)
    expect(swaggerFile.swagger.swagger).toBe('2.0')
  })

  test('create swagger spec', () => {
    expect(swaggerStore.swaggerFiles.length).toBe(0)
    const filePath = path.join(__dirname, 'fixtures', 'does-not-exist.yml')
    expect(fs.existsSync(filePath)).toBe(false)
    swaggerStore.createSwaggerFile(filePath)
    expect(swaggerStore.swaggerFiles.length).toBe(1)
    const swaggerFile = swaggerStore.swaggerFiles[0]
    expect(swaggerFile.filePath).toBe(filePath)
    expect(swaggerFile.swagger.swagger).toBe('2.0')
    expect(fs.existsSync(filePath)).toBe(true)
    fs.unlinkSync(filePath)
    expect(fs.existsSync(filePath)).toBe(false)
  })
})
