import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import path from 'path'
import Debug from 'debug'
import gameApi from './api/gameApi'

const debug = Debug('server')

const port = process.env.PORT || 3000

const app = express()
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '../../public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const title = 'Game Browser'
app.use('/api/games', gameApi(title))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/index.html'))
})

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`)
})
