import express from 'express'
import rawGames from './games'
import BoardGame from '../public/js/BoardGame'

export default function newApiRouter (title) {
  /** @type {BoardGame[]} */
  const games = []
  for (const game of rawGames) {
    games.push(BoardGame.parse(game))
  }

  const router = express.Router()

  router.route('/')
    .get((req, res) => {
      let partialJSON = '['
      for (const game of games) {
        partialJSON += game.stringifyPartial()
        if (games.indexOf(game) !== games.length - 1) {
          partialJSON += ','
        }
      }
      partialJSON += ']'

      res.contentType('application/json').send(partialJSON)
    })

  router.route('/:id')
    .get((req, res) => {
      const id = req.params.id
      /** @type {?BoardGame} */
      let singleGame = null
      for (const game of games) {
        if (game.id === id) {
          singleGame = game
        }
      }
      if (singleGame) {
        res.contentType('application/json').send(singleGame.stringify())
      } else {
        res.status(404).send('game not found')
      }
    })

  return router
}
