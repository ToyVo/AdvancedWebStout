function boardGameController (BoardGame) {
  function post (req, res) {
    const boardGame = new BoardGame(req.body)
    if (boardGame.name && boardGame.year) {
      boardGame.save((error) => {
        if (error) {
          return res.status(400).json({ error })
        } else {
          return res.status(201).json(boardGame)
        }
      })
    } else {
      return res.status(400).json({ error: 'Must supply name and year' })
    }
  }

  function getAll (req, res) {
    BoardGame.find((error, boardGames) => {
      if (error) {
        return res.json({ error })
      } else {
        return res.json(boardGames.map(game => ({
          _id: game._id,
          name: game.name,
          year: game.year
        })))
      }
    })
  }

  function findOne (req, res, next) {
    BoardGame.findById(req.params.id, (error, boardGame) => {
      if (error) {
        return res.json({ error })
      }

      if (boardGame) {
        req.game = boardGame
        return next()
      }

      return res.status(404).json({ error: 'game not found' })
    })
  }

  function getOne (req, res) {
    res.json(req.game)
  }

  function putOne (req, res) {
    const { game } = req
    game.name = req.body.name
    game.year = req.body.year
    game.rating = req.body.rating
    game.minPlayers = req.body.minPlayers
    game.maxPlayers = req.body.maxPlayers
    game.minPlaytime = req.body.minPlaytime
    game.maxPlaytime = req.body.maxPlaytime
    game.minAge = req.body.minAge
    game.designers = req.body.designers
    game.artists = req.body.artists
    game.publishers = req.body.publishers
    game.save(error => {
      if (error) {
        res.status(400).json({ error })
      } else {
        res.json(game)
      }
    })
  }

  function patchOne (req, res) {
    const { game } = req

    if (req.body._id) delete req.body._id

    Object.entries(req.body).forEach(item => {
      const key = item[0]
      game[key] = item[1]
    })

    game.save(error => {
      if (error) {
        res.status(400).json({ error })
      } else {
        res.json(game)
      }
    })
  }

  function deleteOne (req, res) {
    req.game.delete(error => {
      if (error) {
        return res.json({ error })
      } else {
        return res.sendStatus(204)
      }
    })
  }

  return {
    post,
    getAll,
    findOne,
    getOne,
    putOne,
    patchOne,
    deleteOne
  }
}

export default boardGameController
