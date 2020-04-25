import React from 'react'
import PropTypes from 'prop-types'

export default function GameTile (props) {
  /**
   * when the tile is clicked, pass event up to open modal
   * @param {*} event click event
   */
  const gameTileClicked = (event) => {
    event.preventDefault()
    props.activeGameCallback(props.gameData._id)
  }

  return (<div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
    <div className='gameSummary'>
      <a
        onClick={gameTileClicked}
        className='gameTileLink'
        href={`/api/games/${props.gameData._id}`}
      >
        <span className='summaryTitle'> {props.gameData.name}</span>
      </a>
    </div>
  </div>)
}

GameTile.propTypes = {
  gameData: PropTypes.object.isRequired,
  activeGameCallback: PropTypes.func.isRequired
}
