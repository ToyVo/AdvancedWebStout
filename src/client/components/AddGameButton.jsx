import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'

export default function AddGameButton (props) {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [minPlayers, setMinPlayers] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('')
  const [minPlaytime, setMinPlaytime] = useState('')
  const [maxPlaytime, setMaxPlaytime] = useState('')
  const [minAge, setMinAge] = useState('')
  const [rating, setRating] = useState('')
  const [designers, setDesigners] = useState('')
  const [artists, setArtists] = useState('')
  const [publishers, setPublishers] = useState('')

  /**
   * open modal, used in the add game button
   */
  const openModal = () => {
    $('#addGameModal').modal({ backdrop: 'static' })
  }

  /**
   * clean up after submission of a game, or on canceling submission
   */
  const clearModal = () => {
    // hide modal
    $('#addGameModal').modal('hide')
    // clear validation css
    $('#newGameForm').removeClass('was-validated')
    // hide error alert
    $('#addGameAlert').addClass('hidden')

    // reset state to default
    setName('')
    setYear('')
    setMinPlayers('')
    setMaxPlayers('')
    setMinPlaytime('')
    setMaxPlaytime('')
    setMinAge('')
    setRating('')
    setDesigners('')
    setArtists('')
    setPublishers('')
  }

  /**
   * handle the submit event
   * @param {*} event submit event
   */
  const submitGame = (event) => {
    // stop submit event defaults
    event.preventDefault()
    event.stopPropagation()

    // get the form
    const form = document.getElementById('newGameForm')
    // check if the form is valid
    if (form.checkValidity() === false) {
      // apply validation css if validation fails
      form.classList.add('was-validated')
    } else {
      // construct board game from data submitted
      const boardGame = {
        // required values
        name,
        year,

        // optional values, if they are equal to an empty string, put the value as null
        rating: rating === '' ? null : rating,
        minPlayers: minPlayers === '' ? null : minPlayers,
        maxPlayers: maxPlayers === '' ? null : maxPlayers,
        minPlaytime: minPlaytime === '' ? null : minPlaytime,
        maxPlaytime: maxPlaytime === '' ? null : maxPlaytime,
        minAge: minAge === '' ? null : minAge,

        // process the values that are meant to be arrays from strings
        designers: designers === '' ? [] : designers.split(',').map((value) => value.trim()),
        artists: artists === '' ? [] : artists.split(',').map((value) => value.trim()),
        publishers: publishers === '' ? [] : publishers.split(',').map((value) => value.trim())
      }

      // submit game to backend server to persist changes
      // either send game back up to App.jsx so it can add it to it's state, or send an event
      // prompting it do re request data from backend

      Axios.post('/api/games', boardGame)
        .then((results) => {
          clearModal(event)
          props.submitGame({
            _id: results.data._id,
            name: results.data.name,
            year: results.data.year
          })
        })
        .catch((error) => {
          console.error(error.message)
          $('#addGameAlert').removeClass('hidden')
        })
    }
  }

  return (<div>
    <div className='row'>
      <button
        id='addGameButton'
        className='btn btn-primary'
        onClick={openModal}
      >
        Add Game
      </button>
    </div>

    <div
      className='modal fade'
      id='addGameModal'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='addGameModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='addGameModalLabel'>
              Add Game
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
          <div
            id='addGameAlert'
            className='alert alert-success hidden'
            role='alert'
          >
            There was an error entering the game. Maybe the ID was taken?
          </div>
          <form id='newGameForm' className='needs-validation' noValidate>
            <div id='addGameModalBody' className='modal-body'>
              <div className='form-row'>
                <div className='col-md-6 mb-3'>
                  <label htmlFor='newGameName'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='newGameName'
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={event => setName(event.target.value)}
                    required
                  />
                  <div className='invalid-feedback'>
                    Please enter a name.
                  </div>
                </div>
                <div className='col-md-6 mb-6'>
                  <label htmlFor='newGameYear'>Year</label>
                  <input
                    type='number'
                    className='form-control'
                    id='newGameYear'
                    name='year'
                    placeholder='Year'
                    required
                    min='1800'
                    max='2050'
                    value={year}
                    onChange={event => setYear(event.target.value)}
                  />
                  <div className='invalid-feedback'>
                    Please enter a valid year.
                  </div>
                </div>
              </div>
              <div className='form-row'>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='newGameMinPlayers'>Min Players</label>
                  <input
                    type='number'
                    className='form-control'
                    id='newGameMinPlayers'
                    placeholder='Min Players'
                    name='minPlayers'
                    min='0'
                    value={minPlayers}
                    onChange={event => setMinPlayers(event.target.value)}
                  />
                  <div className='invalid-feedback'>Cannot be negative</div>
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='newGameMinPlayTime'>Min PlayTime</label>
                  <input
                    type='number'
                    className='form-control'
                    id='newGameMinPlayTime'
                    placeholder='Min PlayTime'
                    name='minPlaytime'
                    min='0'
                    value={minPlaytime}
                    onChange={event => setMinPlaytime(event.target.value)}
                  />
                  <div className='invalid-feedback'>Cannot be negative</div>
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='newGameMinAge'>Min Age</label>
                  <input
                    type='number'
                    className='form-control'
                    id='newGameMinAge'
                    placeholder='Min Age'
                    name='minAge'
                    min='0'
                    value={minAge}
                    onChange={event => setMinAge(event.target.value)}
                  />
                  <div className='invalid-feedback'>Cannot be negative</div>
                </div>
              </div>
              <div className='form-row'>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='newGameMaxPlayers'>Max Players</label>
                  <input
                    type='number'
                    className='form-control'
                    id='newGameMaxPlayers'
                    placeholder='Max Players'
                    name='maxPlayers'
                    min='0'
                    value={maxPlayers}
                    onChange={event => setMaxPlayers(event.target.value)}
                  />
                  <div className='invalid-feedback'>Cannot be negative</div>
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='newGameMaxPlayTime'>Max PlayTime</label>
                  <input
                    type='number'
                    className='form-control'
                    id='newGameMaxPlayTime'
                    placeholder='Max PlayTime'
                    name='maxPlaytime'
                    min='0'
                    value={maxPlaytime}
                    onChange={event => setMaxPlaytime(event.target.value)}
                  />
                  <div className='invalid-feedback'>Cannot be negative</div>
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='newGameRating'>Rating</label>
                  <input
                    type='number'
                    className='form-control'
                    id='newGameRating'
                    placeholder='Rating'
                    name='rating'
                    min='0'
                    max='10'
                    step='0.1'
                    value={rating}
                    onChange={event => setRating(event.target.value)}
                  />
                  <div className='invalid-feedback'>0 to 10</div>
                </div>
              </div>
              <div className='form-row'>
                <label htmlFor='newGameDesigners'>Designers</label>
                <input
                  type='text'
                  className='form-control'
                  id='newGameDesigners'
                  name='designers'
                  placeholder='Designers'
                  value={designers}
                  onChange={event => setDesigners(event.target.value)}
                />
              </div>
              <div className='form-row'>
                <label htmlFor='newGameArtists'>Artists</label>
                <input
                  type='text'
                  className='form-control'
                  id='newGameArtists'
                  name='artists'
                  placeholder='Artists'
                  value={artists}
                  onChange={event => setArtists(event.target.value)}
                />
              </div>
              <div className='form-row'>
                <label htmlFor='newGamePublishers'>Publishers</label>
                <input
                  type='text'
                  className='form-control'
                  id='newGamePublishers'
                  name='publishers'
                  placeholder='Publishers'
                  value={publishers}
                  onChange={event => setPublishers(event.target.value)}
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='reset'
                className='btn btn-secondary'
                onClick={clearModal}
              >
                Close
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={submitGame}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>)
}

AddGameButton.propTypes = {
  submitGame: PropTypes.func.isRequired
}
