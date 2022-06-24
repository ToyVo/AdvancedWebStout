import express from 'express'

// bring in the raw json data, we can import it like this instead of doing
// fs.readfile, this will bring it in as a javascript object, in this case an array
import games from './games'

export const partialGames = games.map((game) => ({
  id: game.id,
  name: game.name,
  year: game.year
}))

export default function ApiRouter () {
  const router = express.Router()

  // get all games, with partial data
  router.route('/').get((req, res) => {
    res.json(partialGames)
  })

  // get all data for a specific game
  router.route('/:id').get((req, res) => {
    const id = req.params.id
    const singleGame = games.find((game) => game.id === id)
    if (singleGame) {
      res.json(singleGame)
    } else {
      res.status(404).json({ error: 'game not found' })
    }
  })

  return router
}
