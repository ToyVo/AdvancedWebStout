import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

export default function GameDetailsModal (props) {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    props.onCloseDetailsModal()
  }

  const deleteGame = () => {
    Axios.delete(`/api/games/${props.game._id}`)
      .then(() => {
        handleClose()
        props.deleteGame(props.game._id)
      })
      .catch((e) => {
        console.error('error deleting game data')
        console.error(e.message)
      })
  }

  return (<Dialog open={open} onClose={handleClose} aria-labelledby='details-dialog-title' scroll='body'>
    <DialogTitle id='details-dialog-title'>{props.game.name}</DialogTitle>
    <DialogContent>
      <ul>
        <li>Name = {props.game.name}</li>
        <li>Year = {props.game.year}</li>
        <li>Rating = {props.game.rating}</li>
        <li>Min Players = {props.game.minPlayers}</li>
        <li>Max Players = {props.game.maxPlayers}</li>
        <li>Min Playtime = {props.game.minPlaytime}</li>
        <li>Max Playtime = {props.game.maxPlaytime}</li>
        <li>Min Age = {props.game.minAge}</li>
        <li>Designers = {props.game.designers.join(', ')}</li>
        <li>Artists = {props.game.artists.join(', ')}</li>
        <li>Publishers = {props.game.publishers.join(', ')}</li>
        <li>ID = {props.game._id}</li>
      </ul>
    </DialogContent>
    <DialogActions>
      <Button onClick={deleteGame} variant='contained' color='secondary'>Delete</Button>
      <Button onClick={handleClose} variant='outlined' color='primary'>Close</Button>
    </DialogActions>
  </Dialog>)
}

GameDetailsModal.propTypes = {
  game: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired,
  onCloseDetailsModal: PropTypes.func.isRequired
}
