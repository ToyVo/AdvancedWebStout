import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import ProjectTile from './ProjectTile.jsx'

export default function ProjectGrid (props) {
  return (<Grid container>
    {props.projectsData.map((project) => (<ProjectTile
      project={project}
      key={project._id}
      activeProjectCallback={props.activeProjectCallback}
    />))}
  </Grid>)
}

ProjectGrid.propTypes = {
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired, activeProjectCallback: PropTypes.func.isRequired
}
