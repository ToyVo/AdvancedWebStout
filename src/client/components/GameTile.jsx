import React from 'react'
import PropTypes from 'prop-types'

class GameTile extends React.Component {
  render () {
    return (
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
        <div className='gameSummary'>
          <a
            className='gameTileLink'
            href={`/api/games/${this.props.gameData.id}`}
          >
            <span className='summaryTitle'> {this.props.gameData.name}</span>
          </a>
        </div>
      </div>
    )
  }
}

GameTile.propTypes = {
  gameData: PropTypes.object.isRequired
}

export default GameTile
