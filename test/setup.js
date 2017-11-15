import fs from 'fs'

global.fs = fs

global.electron = {
  getCurrentWindow: () => ({
    setTitle: () => {}
  })
}
