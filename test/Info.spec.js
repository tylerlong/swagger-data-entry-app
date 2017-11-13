/* eslint-env jest */
import Info from '../src/web/models/Info'
import Contact from '../src/web/models/Contact'
import License from '../src/web/models/License'

describe('Info', () => {
  test('Create info', () => {
    const info = Info.create({
      title: 'title',
      description: 'description',
      version: 'version',
      contact: Contact.create({
        name: 'contact.name',
        url: 'contact.url',
        email: 'contact.email'
      }),
      license: License.create({
        name: 'license.name',
        url: 'license.url'
      })
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

  test('Default contact', () => {
    const info = Info.create({
      title: 'title',
      description: 'description',
      version: 'version',
      contact: Contact.create(),
      license: License.create({
        name: 'license.name',
        url: 'license.url'
      })
    })

    expect(info.contact.name).toBe('RingCentral Connect Platform')
    expect(info.contact.url).toBe('http://developers.ringcentral.com')
    expect(info.contact.email).toBe('platform@ringcentral.com')
  })

  test('Default license', () => {
    const info = Info.create({
      title: 'title',
      description: 'description',
      version: 'version',
      contact: Contact.create({
        name: 'contact.name',
        url: 'contact.url',
        email: 'contact.email'
      }),
      license: License.create()
    })

    expect(info.license.name).toBe('RingCentral API License Agreement and Terms of Use')
    expect(info.license.url).toBe('https://www.ringcentral.com/legal/apilitos.html')
  })
})
