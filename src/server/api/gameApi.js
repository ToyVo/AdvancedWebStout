import express from 'express'
import boardGameController from '../controllers/boardGameController'

export default function ApiRouter (BoardGame) {
  const router = express.Router()
  const controller = boardGameController(BoardGame)

  router.route('/')
    // Read all games, with partial data
    .get(controller.getAll)
    // Create
    .post(controller.post)

  // middle wear for getting a specific game by an id
  router.use('/:id', controller.findOne)
  router.route('/:id')
    // Read all data for a specific game
    .get(controller.getOne)
    // Update a whole object
    .put(controller.putOne)
    // Update partial data
    .patch(controller.patchOne)
    // Delete
    .delete(controller.deleteOne)

  return router
}
