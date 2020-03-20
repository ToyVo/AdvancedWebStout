import express from 'express'

const gameRouter = express.Router()

gameRouter.route('/')
  .get((req, res) => {
    res.send('all games')
  })

gameRouter.route('/:id')
  .get((req, res) => {
    const id = req.params.id
    res.send('single game')
  })

export default gameRouter
