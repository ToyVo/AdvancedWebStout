import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import path from 'path'
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
app.use(express.static(path.join(__dirname, '../../public')))

// use EJS for views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// setup api routes
app.use('/api/games', gameApi())

// serve index.html when getting from root, this eventually 
//change with webpack to serve this from the public directory with static above
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/index.html'))
})

// listen on port and debug when it is ready
app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`)
})
