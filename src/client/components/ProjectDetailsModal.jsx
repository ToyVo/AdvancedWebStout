import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Axios from 'axios'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Transition from '../helpers/Transition.jsx'

export default function ProjectDetailsModal (props) {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    props.onCloseDetailsModal()
  }

  const deleteProject = () => {
    Axios.delete(`/api/projects/${props.project._id}`)
      .then(() => {
        handleClose()
        props.deleteProject(props.project._id)
      })
      .catch((e) => {
        console.error('error deleting project data')
        console.error(e.message)
      })
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby='details-dialog-title'
      scroll='body'
    >
      <DialogTitle id='details-dialog-title'>{props.project.name}</DialogTitle>
      <DialogContent>
        <ul>
          <li>_id = {props.project._id}</li>
          <li>creator = {props.project.creator}</li>
          <li>fileURLs = {props.project.fileURLs.join(', ')}</li>
          <li>imageURLs = {props.project.imageURLs.join(', ')}</li>
          <li>name = {props.project.name}</li>
          <li>publishDate = {props.project.publishDate}</li>
          <li>updateDate = {props.project.updateDate}</li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteProject} variant='contained' color='secondary'>
          Delete
        </Button>
        <Button onClick={handleClose} variant='outlined' color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ProjectDetailsModal.propTypes = {
  project: PropTypes.object.isRequired, deleteProject: PropTypes.func.isRequired, onCloseDetailsModal: PropTypes.func.isRequired
}
