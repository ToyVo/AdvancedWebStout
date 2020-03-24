import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import path from 'path'
import GameRouter from './routers/gameRouter'
import Debug from 'debug'
import gameApi from './api/gameApi'

const debug = Debug('server')

const port = process.env.PORT || 3000

const app = express()
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const title = 'Game Browser'
app.use('/api/games', gameApi(title))
app.use('/games', GameRouter(title))
app.get('/', (req, res) => {
  res.render('index', { title })
})

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`)
})
