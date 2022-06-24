import React from 'react'
import Axios from 'axios'
import Banner from './Banner.jsx'
import GameGrid from './GameGrid.jsx'
import GameDetailsModal from './GameDetailsModal.jsx'
import AddGameButton from './AddGameButton.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gamesData: [],
      activeGame: null
    }
    this.setActiveGame = this.setActiveGame.bind(this)
    this.submitGame = this.submitGame.bind(this)
  }

  /**
   * set the active game for use in the game details modal
   * @param {string} gameID the id of the game
   */
  setActiveGame (gameID) {
    Axios.get(`/api/games/${gameID}`)
      .then((results) => {
        this.setState({
          activeGame: results.data
        })
      })
      .catch((e) => {
        console.error('error retriving game data')
        console.error(e.message)
      })
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
    id: number
    }} boardGame board game to be submitted to the database
   */
  submitGame (boardGame) {
    console.log(boardGame)
    this.setState({ gamesData: [...this.state.gamesData, boardGame] })
  }

  /**
   * fetch all data from server on mount
   */
  componentDidMount () {
    Axios.get('/api/games')
      .then((results) => {
        this.setState({
          gamesData: results.data
        })
      })
      .catch((e) => {
        console.error('unable to retrieve movies')
        console.error(e.message)
      })
  }

  render () {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <Banner title='Game Browser'>
              Click on a game for more information
            </Banner>
          </div>
          <GameGrid
            gamesData={this.state.gamesData}
            activeGameCallback={this.setActiveGame}
          />
          <AddGameButton submitGame={this.submitGame}/>
        </div>
        {this.state.activeGame && (
          <GameDetailsModal game={this.state.activeGame} />
        )}
      </div>
    )
  }
}

export default App
