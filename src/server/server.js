import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import Debug from 'debug'
import gameApi from './api/gameApi'

// instead of console logging use debug
const debug = Debug('server')

// get port from env
const port = process.env.PORT || 3000

// create express application
const app = express()

// morgan will log requests to debug
app.use(morgan('tiny'))

// mark the public directory to serve as static
app.use(express.static('public'))

// setup api routes
app.use('/api/games', gameApi())

// listen on port and debug when it is ready
app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`)
})
