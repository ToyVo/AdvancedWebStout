function projectController (ProjectModel) {
  function post (req, res) {
    const project = new ProjectModel(req.body)
    if (project.name && project.creator) {
      project.save((error) => {
        if (error) {
          return res.status(400).json({ error })
        } else {
          return res.status(201).json(project)
        }
      })
    } else {
      return res.status(400).json({ error: 'Must supply name and creator' })
    }
  }

  function getAll (req, res) {
    ProjectModel.find((error, projects) => {
      if (error) {
        return res.json({ error })
      } else {
        return res.json(projects.map(project => (
          {
            // almost all the information, except the files themselves
            // everything else would be useful for sorting or viewing
            _id: project._id, creator: project.creator, name: project.name, publishDate: project.publishDate, imageURLs: project.imageURLs, updateDate: project.updateDate
          }
        )))
      }
    })
  }

  function findOne (req, res, next) {
    ProjectModel.findById(req.params.id, (error, project) => {
      if (error) {
        return res.json({ error })
      }

      if (project) {
        req.project = project
        return next()
      }

      return res.status(404).json({ error: 'project not found' })
    })
  }

  function getOne (req, res) {
    res.json(req.project)
  }

  function putOne (req, res) {
    const { project } = req
    project.name = req.body.name
    project.creator = req.body.creator
    project.fileURLs = req.body.fileURLs
    project.imageURLs = req.body.imageURLs
    project.updateDate = new Date()
    project.save(error => {
      if (error) {
        res.status(400).json({ error })
      } else {
        res.json(project)
      }
    })
  }

  function patchOne (req, res) {
    const { project } = req

    // we don't want these values to be updated
    if (req.body._id) {
      delete req.body._id
    }
    if (req.body.publishDate) {
      delete req.body.publishDate
    }

    Object.entries(req.body).forEach(item => {
      const key = item[0]
      project[key] = item[1] // value
    })

    project.updateDate = new Date()

    project.save(error => {
      if (error) {
        res.status(400).json({ error })
      } else {
        res.json(project)
      }
    })
  }

  function deleteOne (req, res) {
    req.project.delete(error => {
      if (error) {
        return res.json({ error })
      } else {
        return res.sendStatus(204)
      }
    })
  }

  return {
    post, getAll, findOne, getOne, putOne, patchOne, deleteOne
  }
}

export default projectController
