import React from 'react'
import Axios from 'axios'
import Banner from './Banner.jsx'
import GameGrid from './GameGrid.jsx'
import GameDetailsModal from './GameDetailsModal.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gamesData: [],
      activeGame: null
    }
    this.setActiveGame = this.setActiveGame.bind(this)
  }

  setActiveGame(gameID) {
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

  componentDidMount() {
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

  render() {
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
        </div>
        {this.state.activeGame && (
          <GameDetailsModal game={this.state.activeGame} />
        )}
      </div>
    )
  }
}

export default App
