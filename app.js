import fs from 'fs'

console.log('hello world')
fs.writeFileSync('test.txt', 'hello files', { encoding: 'utf8' })
