import React from 'react'

class AddGameButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      year: '',
      minPlayers: '',
      maxPlayers: '',
      minPlaytime: '',
      maxPlaytime: '',
      minAge: '',
      rating: '',
      designers: [],
      artists: [],
      publishers: [],
      id: ''
    }

    this.openModal = this.openModal.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  openModal () {
    $('#addGameModal').modal()
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <button id='addGameButton' className='btn btn-primary'>
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
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        required
                      />
                      <div className='invalid-feedback'>
                        Please enter a name.
                      </div>
                    </div>
                    <div className='col-md-3 mb-3'>
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
                        value={this.state.year}
                        onChange={this.handleInputChange}
                      />
                      <div className='invalid-feedback'>
                        Please enter a valid year.
                      </div>
                    </div>
                    <div className='col-md-3 mb-3'>
                      <label htmlFor='newGameID'>ID</label>
                      <input
                        type='number'
                        className='form-control'
                        id='newGameID'
                        name='id'
                        placeholder='ID'
                        required
                        min='000000'
                        max='999999'
                        value={this.state.id}
                        onChange={this.handleInputChange}
                      />
                      <div className='invalid-feedback'>
                        Please enter a valid ID.
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
                        value={this.state.minPlayers}
                        onChange={this.handleInputChange}
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
                        value={this.state.minPlaytime}
                        onChange={this.handleInputChange}
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

                        value={this.state.minAge}
                        onChange={this.handleInputChange}
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

                        value={this.state.maxPlayers}
                        onChange={this.handleInputChange}
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

                        value={this.state.maxPlaytime}
                        onChange={this.handleInputChange}
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

                        value={this.state.rating}
                        onChange={this.handleInputChange}
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
                      value={this.state.designers.join(', ')}
                      onChange={this.handleInputChange}
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

                      value={this.state.artists.join(', ')}
                      onChange={this.handleInputChange}
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

                      value={this.state.publishers.join(', ')}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className='modal-footer'>
                  <button
                    type='reset'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                  >
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddGameButton
