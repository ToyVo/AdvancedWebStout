import express from 'express'
import projectController from '../controllers/projectController'

export default function ApiRouter (ProjectModel) {
  const router = express.Router()
  const controller = projectController(ProjectModel)

  router.route('/')
    // Read all projects, with partial data
    .get(controller.getAll)
    // Create
    .post(controller.post)

  // middle wear for getting a specific project by an id
  router.use('/:id', controller.findOne)
  router.route('/:id')
    // Read all data for a specific project
    .get(controller.getOne)
    // Update a whole object
    .put(controller.putOne)
    // Update partial data
    .patch(controller.patchOne)
    // Delete
    .delete(controller.deleteOne)

  return router
}
