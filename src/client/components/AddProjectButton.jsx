import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

export default function AddProjectButton(props) {

  const editProject = () => {
    props.editProject({})
  }

  return (<Button variant='contained' color='primary' onClick={editProject}>Add Project</Button>)
}

AddProjectButton.propTypes = {
  editProject: PropTypes.func.isRequired
}
