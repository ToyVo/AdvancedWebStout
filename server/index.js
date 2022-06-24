import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import path from 'path'
import gameRouter from './api/gameRouter'
const debug = require('debug')('server')

const port = process.env.PORT || 3000

const app = express()
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/games', gameRouter)
app.get('/', (req, res) => {
  res.render('index', { title: 'test' })
})

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`)
})
