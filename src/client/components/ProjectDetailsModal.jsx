import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import Axios from 'axios'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Transition from '../helpers/Transition.jsx'

const useStyles = makeStyles((theme) => (
  {
    downloadButton: {
      margin: theme.spacing(1)
    }
  }
))

export default function ProjectDetailsModal(props) {
  const classes = useStyles()

  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(true)
  }, [props.project])

  const handleClose = () => {
    setOpen(false)
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

  const editProject = () => {
    props.editProject(props.project)
    handleClose()
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
          <li>imageURLs = {props.project.imageURLs.join(', ')}</li>
          <li>name = {props.project.name}</li>
          <li>publishDate = {props.project.publishDate}</li>
          <li>updateDate = {props.project.updateDate}</li>
        </ul>
        {props.project.fileURLs.map((fileURL) => {
          const splitURL = fileURL.split('/')
          return <Button className={classes.downloadButton} key={fileURL} variant='contained' color='primary' href={fileURL} download>{splitURL[splitURL.length - 1]}</Button>
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={editProject} variant='contained' color='primary'>
          Edit Details
        </Button>
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
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired
}
