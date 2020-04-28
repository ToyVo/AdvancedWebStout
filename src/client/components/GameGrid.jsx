import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import GameTile from './GameTile.jsx'

export default function GameGrid (props) {
  return (<Grid container>
    {props.gamesData.map((game) => (<GameTile
      gameData={game}
      key={game._id}
      activeGameCallback={props.activeGameCallback}
    />))}
  </Grid>)
}

GameGrid.propTypes = {
  gamesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeGameCallback: PropTypes.func.isRequired
}
