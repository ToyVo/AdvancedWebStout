import express from 'express'
import games from '../api/games'

export default function newGameRouter (title) {
  const router = express.Router()

  router.route('/')
    .get((req, res) => {
      res.render('allGames', { title, games })
    })

  router.route('/:id')
    .get((req, res) => {
      const id = req.params.id
      let singleGame = null
      for (const game of games) {
        if (game.id === id) {
          singleGame = game
        }
      }
      if (singleGame) {
        res.render('singleGame', { title, game: singleGame })
      } else {
        res.send('single game not found')
      }
    })

  return router
}
