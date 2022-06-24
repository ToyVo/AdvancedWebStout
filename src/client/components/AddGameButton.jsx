import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

export default function AddGameButton (props) {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState(false)
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
  const handleOpen = () => {
    setOpen(true)
  }

  /**
   * clean up after submission of a game, or on canceling submission
   */
  const clearForm = () => {
    setOpen(false)
    // clear validation css
    setFormError(false)

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
   */
  const submitGame = () => {
    // get the form
    const form = document.getElementById('newGameForm')
    // check if the form is valid
    if (form.checkValidity() === false) {
      setFormError(true)
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
          clearForm()
          props.submitGame({
            _id: results.data._id,
            name: results.data.name,
            year: results.data.year
          })
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
  }

  return (<div>
    <Button variant='contained' color='primary' onClick={handleOpen}>
      Add Game
    </Button>
    <Dialog open={open} disableBackdropClick={true} aria-labelledby='add-game-title'>
      <DialogTitle>Add Game</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete='off' id='newGameForm' className={classes.form}>
          <TextField id='newGameName'
            label='Name' value={name}
            onChange={event => setName(event.target.value)}
            error={formError}
            required={true}
          />
          <TextField id='newGameYear'
            label='Year' value={year}
            onChange={event => setYear(event.target.value)}
            helperText='1800 - 2050'
            error={formError}
            required={true} type='number'
            inputProps={{
              min: '1800',
              max: '2050',
              step: '1'
            }}
          />
          <TextField id='newGameMinPlayers'
            label='Min Players' value={minPlayers}
            onChange={event => setMinPlayers(event.target.value)}
            type='number'
            helperText='0+'
            inputProps={{
              min: '0',
              step: '1'
            }}
          />
          <TextField id='newGameMaxPlayers'
            label='Max Players' value={maxPlayers}
            onChange={event => setMaxPlayers(event.target.value)}
            type='number'
            helperText='0+'
            inputProps={{
              min: '0',
              step: '1'
            }}
          />
          <TextField id='newGameMinPlaytime'
            label='Min Playtime' value={minPlaytime}
            onChange={event => setMinPlaytime(event.target.value)}
            type='number' helperText='0+'
            inputProps={{
              min: '0',
              step: '1'
            }}
          />
          <TextField id='newGameMaxPlaytime'
            label='Max Playtime' value={maxPlaytime}
            onChange={event => setMaxPlaytime(event.target.value)}
            type='number' helperText='0+'
            inputProps={{
              min: '0',
              step: '1'
            }}
          />
          <TextField id='newGameMinAge'
            label='Min Age' value={minAge}
            onChange={event => setMinAge(event.target.value)}
            type='number' helperText='0+'
            inputProps={{
              min: '0',
              step: '1'
            }}
          />
          <TextField id='newGameRating'
            label='Rating' value={rating}
            onChange={event => setRating(event.target.value)}
            type='number' helperText='0 - 10'
            inputProps={{
              min: '0',
              max: '10',
              step: '0.1'
            }}
          />
          <TextField id='newGameDesigners'
            label='Designers' value={designers}
            onChange={event => setDesigners(event.target.value)}
            helperText='Comma separated'
          />
          <TextField id='newGameArtists'
            label='Artists' value={artists}
            onChange={event => setArtists(event.target.value)}
            helperText='Comma separated'
          />
          <TextField id='newGamePublishers'
            label='Publishers' value={publishers}
            onChange={event => setPublishers(event.target.value)}
            helperText='Comma separated'
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitGame} variant='contained' color='primary'>Save</Button>
        <Button onClick={clearForm} variant='outlined' color='primary'>Close</Button>
      </DialogActions>
    </Dialog>
  </div>)
}

AddGameButton.propTypes = {
  submitGame: PropTypes.func.isRequired
}
