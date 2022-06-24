import React, { useState } from 'react'
import Axios from 'axios'
import Banner from './Banner.jsx'
import GameGrid from './GameGrid.jsx'
import GameDetailsModal from './GameDetailsModal.jsx'
import AddGameButton from './AddGameButton.jsx'

export default function App () {
  const [gamesData, setGamesData] = useState([])
  const [activeGame, setActiveGame] = useState(null)

  if (gamesData.length === 0) {
    /**
     * fetch all data from server on mount
     */
    Axios.get('/api/games')
      .then((results) => {
        setGamesData(results.data)
      })
      .catch((e) => {
        console.error('unable to retrieve movies')
        console.error(e.message)
      })
  }

  /**
   * set the active game for use in the game details modal
   * @param {string} gameID the id of the game
   */
  const retrieveActiveMovie = (gameID) => {
    Axios.get(`/api/games/${gameID}`)
      .then((results) => {
        setActiveGame(results.data)
      })
      .catch((e) => {
        console.error('error retrieving game data')
        console.error(e.message)
      })
  }

  const deleteGame = (gameID) => {
    setGamesData(gamesData.filter(game => game._id !== gameID))
  }

  /**
   * submit a board game to the database to persist
   * @param {{
    name: string,
    year: number,
    rating: number,
    minPlayers: number,
    maxPlayers: number,
    minPlaytime: number,
    maxPlaytime: number,
    minAge: number,
    designers: string[],
    artists: string[],
    publishers: string[],
    _id: string
    }} boardGame board game to be submitted to the database
   */
  const submitGame = (boardGame) => {
    console.log(boardGame)
    setGamesData([...gamesData, boardGame])
  }

  return (<div>
    <div className='container'>
      <div className='row'>
        <Banner title='Game Browser'>
          Click on a game for more information
        </Banner>
      </div>
      <GameGrid
        gamesData={gamesData}
        activeGameCallback={retrieveActiveMovie}
      />
      <AddGameButton submitGame={submitGame}/>
    </div>
    {activeGame && <GameDetailsModal deleteGame={deleteGame} game={activeGame}/>}
  </div>)
}
