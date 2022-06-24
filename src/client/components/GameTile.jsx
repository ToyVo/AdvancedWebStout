import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.spacing(1.5)
  },
  paper: {
    backgroundColor: '#FFF',
    padding: '5px',
    margin: theme.spacing(1),
    width: theme.spacing(16),
    height: theme.spacing(12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonRipple: {
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
   */
  const gameTileClicked = () => {
    props.activeGameCallback(props.gameData._id)
  }

  return (
    <Grid item>
      <Button variant='contained' onClick={gameTileClicked} className={classes.paper}>
        <Typography variant='body1' className={classes.title}>
          {props.gameData.name}
        </Typography>
      </Button>
    </Grid>
  )
}

GameTile.propTypes = {
  gameData: PropTypes.object.isRequired,
  activeGameCallback: PropTypes.func.isRequired
}
