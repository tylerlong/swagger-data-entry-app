import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

const swaggers = [
  yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'fixtures', 'rc-platform-messaging.yml'), 'utf8')),
  yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'fixtures', 'rc-platform-call-log.yml'), 'utf8'))
]

export default swaggers
