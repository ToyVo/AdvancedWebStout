import React from 'react'
import PropTypes from 'prop-types'

class GameTile extends React.Component {
  constructor (props) {
    super(props)
    this.gameTileClicked = this.gameTileClicked.bind(this)
  }

  render () {
    return (
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
        <div className='gameSummary'>
          <a
            onClick={this.gameTileClicked}
            className='gameTileLink'
            href={`/api/games/${this.props.gameData._id}`}
          >
            <span className='summaryTitle'> {this.props.gameData.name}</span>
          </a>
        </div>
      </div>
    )
  }

  /**
   * when the tile is clicked, pass event up to open modal
   * @param {*} event click event
   */
  gameTileClicked (event) {
    event.preventDefault()
    this.props.activeGameCallback(this.props.gameData._id)
  }
}

GameTile.propTypes = {
  gameData: PropTypes.object.isRequired,
  activeGameCallback: PropTypes.func.isRequired
}

export default GameTile
