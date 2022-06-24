import React from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'

class GameDetailsModal extends React.Component {
  constructor (props) {
    super(props)
    this.deleteGame = this.deleteGame.bind(this)
  }

  componentDidMount () {
    $('#boardGameModal').modal()
  }

  componentDidUpdate () {
    $('#boardGameModal').modal()
  }

  deleteGame () {
    Axios.delete(`/api/games/${this.props.game._id}`)
      .then(() => {
        $('#boardGameModal').modal('hide')
        this.props.deleteGame(this.props.game._id)
      })
      .catch((e) => {
        console.error('error deleting game data')
        console.error(e.message)
      })
  }

  render () {
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
              {this.props.game.name}
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
              <li>Name = {this.props.game.name}</li>
              <li>Year = {this.props.game.year}</li>
              <li>Rating = {this.props.game.rating}</li>
              <li>Min Players = {this.props.game.minPlayers}</li>
              <li>Max Players = {this.props.game.maxPlayers}</li>
              <li>Min Playtime = {this.props.game.minPlaytime}</li>
              <li>Max Playtime = {this.props.game.maxPlaytime}</li>
              <li>Min Age = {this.props.game.minAge}</li>
              <li>Designers = {this.props.game.designers.join(', ')}</li>
              <li>Artists = {this.props.game.artists.join(', ')}</li>
              <li>Publishers = {this.props.game.publishers.join(', ')}</li>
              <li>ID = {this.props.game._id}</li>
            </ul>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-danger' onClick={this.deleteGame}>
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
}

GameDetailsModal.propTypes = {
  game: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired
}

export default GameDetailsModal
