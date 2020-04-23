import React from 'react'
import PropTypes from 'prop-types'

import GameTile from './GameTile.jsx'

class GameGrid extends React.Component {
  render() {
    return (
      <div className='col-12'>
        <div className='row'>
          {this.props.gamesData.map((game) => (
            <GameTile gameData={game} key={game.id} activeGameCallback={this.props.activeGameCallback} />
          ))}
        </div>
      </div>
    )
  }
}

GameGrid.propTypes = {
  gamesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeGameCallback: PropTypes.func.isRequired
}

export default GameGrid
