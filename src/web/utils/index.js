export const update = self => {
  return (key, value) => {
    if (self[key] === undefined) {
      throw new Error(`Unknown key '${key}'`)
    }
    self[key] = value
  }
}
