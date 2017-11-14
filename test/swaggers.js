import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

const swaggers = fs.readdirSync(path.join(__dirname, 'fixtures'))
  .map(file => yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'fixtures', file), 'utf8')))

export default swaggers
