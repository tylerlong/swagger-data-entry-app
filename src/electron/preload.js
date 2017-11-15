import fs from 'fs'
import electron from 'electron'

process.once('loaded', () => {
  global.fs = fs
  global.electron = electron.remote
})
