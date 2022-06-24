import express from 'express'
import games from './games'

export default function newApiRouter (title) {
  const partialGames = games.map(game => ({
    id: game.id,
    name: game.name,
    year: game.year
  }));

  const router = express.Router()

  router.route('/')
    .get((req, res) => {
      res.json(partialGames)
    })

  router.route('/:id')
    .get((req, res) => {
      const id = req.params.id
      const singleGame = games.find(game => game.id === id)
      if (singleGame) {
        res.json(singleGame)
      } else {
        res.status(404).json({"error":"game not found"})
      }
    })

  return router
}
