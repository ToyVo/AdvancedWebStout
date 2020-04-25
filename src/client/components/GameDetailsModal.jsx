import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'

export default function GameDetailsModal (props) {
  useEffect(() => {
    $('#boardGameModal').modal()
  })

  const deleteGame = () => {
    Axios.delete(`/api/games/${props.game._id}`)
      .then(() => {
        $('#boardGameModal').modal('hide')
        props.deleteGame(props.game._id)
      })
      .catch((e) => {
        console.error('error deleting game data')
        console.error(e.message)
      })
  }

  return (<div
    className='modal fade'
    id='boardGameModal'
    tabIndex='-1'
    role='dialog'
    aria-labelledby='boardGameModalLabel'
    aria-hidden='true'
  >
    <div className='modal-dialog' role='document'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title' id='boardGameModalLabel'>
            {props.game.name}
          </h5>
          <button
            type='button'
            className='close'
            data-dismiss='modal'
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div id='boardGameModalBody' className='modal-body'>
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
        </div>
        <div className='modal-footer'>
          <button className='btn btn-danger' onClick={deleteGame}>
            Delete
          </button>
          <button
            type='button'
            className='btn btn-primary'
            data-dismiss='modal'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>)
}

GameDetailsModal.propTypes = {
  game: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired
}
