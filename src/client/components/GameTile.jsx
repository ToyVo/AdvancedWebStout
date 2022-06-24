import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    textAlign: 'center',
    padding: '5px',
    margin: theme.spacing(1),
    width: theme.spacing(16),
    height: theme.spacing(12)
  }
}))

export default function GameTile (props) {
  const classes = useStyles()

  /**
   * when the tile is clicked, pass event up to open modal
   * @param {*} event click event
   */
  const gameTileClicked = (event) => {
    event.preventDefault()
    props.activeGameCallback(props.gameData._id)
  }

  return (<Grid item>
    <Paper variant='outlined' className={classes.paper}>
      <a
        onClick={gameTileClicked}
        className='gameTileLink'
        href={`/api/games/${props.gameData._id}`}
      >
        <Typography variant='body1'>{props.gameData.name}</Typography>
      </a>
    </Paper>
  </Grid>)
}

GameTile.propTypes = {
  gameData: PropTypes.object.isRequired,
  activeGameCallback: PropTypes.func.isRequired
}
