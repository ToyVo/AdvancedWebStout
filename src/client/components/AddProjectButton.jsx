import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core'
import Axios from 'axios'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Transition from '../helpers/Transition.jsx'

const useStyles = makeStyles((theme) => (
  {
    form: {
      '& > *': {
        margin: theme.spacing(1), width: '25ch'
      }
    }
  }
))

export default function AddProjectButton (props) {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState(false)
  const [name, setName] = useState('')
  const [creator, setCreator] = useState('')
  const [fileURLs, setFileURLs] = useState('')
  const [imageURLs, setImageURLs] = useState('')

  /**
   * open modal, used in the add project button
   */
  const handleOpen = () => {
    setOpen(true)
  }

  /**
   * clean up after submission of a project, or on canceling submission
   */
  const clearForm = () => {
    setOpen(false)
    // clear validation css
    setFormError(false)

    // reset state to default
    setName('')
    setCreator('')
    setFileURLs('')
    setImageURLs('')
  }

  /**
   * handle the submit event
   */
  const submitProject = () => {
    // get the form
    const form = document.getElementById('newProjectForm')
    // check if the form is valid
    if (form.checkValidity() === false) {
      setFormError(true)
    } else {
      // construct project from data submitted
      const date = new Date()
      const project = {
        // required values
        name,
        creator,

        // process the values that are meant to be arrays from strings
        fileURLs: fileURLs === '' ? [] : fileURLs.split(',').map((value) => value.trim()),
        imageURLs: imageURLs === '' ? [] : imageURLs.split(',').map((value) => value.trim()),

        // set the current date and time to both publish and update
        publishDate: date,
        updateDate: date
      }

      // submit project to backend server to persist changes
      Axios.post('/api/projects', project)
        .then((results) => {
          clearForm()
          props.submitProject({
            _id: results.data._id, creator: results.data.creator, name: results.data.name, publishDate: results.data.publishDate, imageURLs: results.data.imageURLs, updateDate: results.data.updateDate
          })
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Add Project
      </Button>
      <Dialog TransitionComponent={Transition} open={open} disableBackdropClick={true}
        aria-labelledby='add-project-title'>
        <DialogTitle id='add-project-title'>Add Project</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off' id='newProjectForm' className={classes.form}>
            <TextField id='newProjectName'
              label='Name' value={name}
              onChange={event => setName(event.target.value)}
              error={formError}
              required={true}
            />
            <TextField id='newProjectCreator'
              label='Creator' value={creator}
              onChange={event => setCreator(event.target.value)}
              error={formError}
              required={true}
            />
            <TextField id='newProjectFileURLs'
              label='File URLs' value={fileURLs}
              onChange={event => setFileURLs(event.target.value)}
              helperText='Comma separated'
            />
            <TextField id='newProjectImageURLs'
              label='Image URLs' value={imageURLs}
              onChange={event => setImageURLs(event.target.value)}
              helperText='Comma separated'
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitProject} variant='contained' color='primary'>Save</Button>
          <Button onClick={clearForm} variant='outlined' color='primary'>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddProjectButton.propTypes = {
  submitProject: PropTypes.func.isRequired
}
