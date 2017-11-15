import fs from 'fs'

process.once('loaded', () => {
  global.fs = fs
})
