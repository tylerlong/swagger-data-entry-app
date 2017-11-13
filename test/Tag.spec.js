/* eslint-env jest */
import Tag from '../src/web/models/Tag'

describe('Tag', () => {
  test('Create tag', () => {
    const tag = Tag.create({
      name: 'name'
    })

    expect(tag.name).toBe('name')
  })
})
