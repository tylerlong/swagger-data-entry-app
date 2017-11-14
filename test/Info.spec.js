/* eslint-env jest */
import Info from '../src/web/models/Info'

describe('Info', () => {
  test('Create info', () => {
    const info = Info.create({
      title: 'title',
      description: 'description',
      version: 'version',
      contact: {
        name: 'contact.name',
        url: 'contact.url',
        email: 'contact.email'
      },
      license: {
        name: 'license.name',
        url: 'license.url'
      }
    })

    expect(info.title).toBe('title')
    expect(info.description).toBe('description')
    expect(info.version).toBe('version')

    expect(info.contact.name).toBe('contact.name')
    expect(info.contact.url).toBe('contact.url')
    expect(info.contact.email).toBe('contact.email')

    expect(info.license.name).toBe('license.name')
    expect(info.license.url).toBe('license.url')
  })
})
