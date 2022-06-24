import React from 'react'
import PropTypes from 'prop-types'

import GameTile from './GameTile.jsx'

export default function GameGrid (props) {
  return (<div className='col-12'>
    <div className='row'>
      {props.gamesData.map((game) => (<GameTile
        gameData={game}
        key={game._id}
        activeGameCallback={props.activeGameCallback}
      />))}
    </div>
  </div>)
}

GameGrid.propTypes = {
  gamesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeGameCallback: PropTypes.func.isRequired
}
