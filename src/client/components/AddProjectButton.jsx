import React from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => (
  {
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  }
))

export default function AddProjectButton (props) {
  const classes = useStyles()

  const editProject = () => {
    props.editProject({})
  }

  return (<Fab color='primary' aria-label='add' className={classes.fab} onClick={editProject}><AddIcon/></Fab>)
}

AddProjectButton.propTypes = {
  editProject: PropTypes.func.isRequired
}
