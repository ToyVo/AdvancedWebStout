import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import path from 'path'
import Debug from 'debug'
import gameApi, { partialGames } from './api/gameApi'

// instead of console logging use debug
const debug = Debug('server')

// get port from env
const port = process.env.PORT || 3000

// create express application
const app = express()

// morgan will log requests to debug
app.use(morgan('tiny'))

// use EJS for views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
  if (req.path === '/') {
    res.render('index', { gameData: partialGames })
  } else {
    next()
  }
})

// mark the public directory to serve as static
app.use(express.static('public'))

// setup api routes
app.use('/api/games', gameApi())

// listen on port and debug when it is ready
app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`)
})
