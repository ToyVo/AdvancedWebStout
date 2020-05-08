import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core'
import Axios from 'axios'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
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

export default function EditProjectDialog(props) {
  const classes = useStyles()

  const [open, setOpen] = useState(true)
  const [dialogTitle, setDialogTitle] = useState(props.activeEditProject.name ? `Edit ${props.activeEditProject.name}` : 'Add Project')
  const [formError, setFormError] = useState(false)
  const [name, setName] = useState(props.activeEditProject.name || '')
  const [creator, setCreator] = useState(props.activeEditProject.creator || '')
  const [fileURLs, setFileURLs] = useState(props.activeEditProject.fileURLs ? props.activeEditProject.fileURLs.join(', ') : '')
  const [imageURLs, setImageURLs] = useState(props.activeEditProject.imageURLs ? props.activeEditProject.imageURLs.join(', ') : '')

  useEffect(() => {
    setOpen(true)
    setDialogTitle(props.activeEditProject.name ? `Edit ${props.activeEditProject.name}` : 'Add Project')
    setName(props.activeEditProject.name || '')
    setCreator(props.activeEditProject.creator || '')
    setFileURLs(props.activeEditProject.fileURLs ? props.activeEditProject.fileURLs.join(', ') : '')
    setImageURLs(props.activeEditProject.imageURLs ? props.activeEditProject.imageURLs.join(', ') : '')
  }, [props.activeEditProject])

  const closeDialog = () => {
    setOpen(false)
  }

  const submitProject = () => {
    if (props.activeEditProject._id) {
      updateProject()
    } else {
      submitNewProject()
    }
  }

  const updateProject = () => {
    // get the form
    const form = document.getElementById('newProjectForm')
    // check if the form is valid
    if (form.checkValidity() === false) {
      setFormError(true)
    } else {
      // construct project from data submitted
      const project = {
        // required values
        name,
        creator,
        // process the values that are meant to be arrays from strings
        fileURLs: fileURLs === '' ? [] : fileURLs.split(',').map((value) => value.trim()),
        imageURLs: imageURLs === '' ? [] : imageURLs.split(',').map((value) => value.trim())
      }

      // submit project to backend server to persist changes
      Axios.patch(`/api/projects/${props.activeEditProject._id}`, project)
        .then((results) => {
          closeDialog()
          props.updateProject({
            _id: results.data._id, creator: results.data.creator, name: results.data.name, publishDate: results.data.publishDate, imageURLs: results.data.imageURLs, updateDate: results.data.updateDate
          })
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
  }

  /**
   * handle the submit event
   */
  const submitNewProject = () => {
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
          closeDialog()
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
    <Dialog TransitionComponent={Transition} open={open} disableBackdropClick={true}
      aria-labelledby='add-project-title'>
      <DialogTitle id='add-project-title'>{dialogTitle}</DialogTitle>
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
        <Button onClick={closeDialog} variant='outlined' color='primary'>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

EditProjectDialog.propTypes = {
  submitProject: PropTypes.func.isRequired,
  activeEditProject: PropTypes.object.isRequired,
  updateProject: PropTypes.func.isRequired
}
