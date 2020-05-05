import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  banner: {
    borderBottom: '1px solid grey', padding: theme.spacing(2)
  }
}))

export default function Banner (props) {
  const classes = useStyles()
  return (<div className={classes.banner}>
    <Typography variant='h1'>{props.title}</Typography>
    <Typography variant='body1'>{props.children}</Typography>
  </div>)
}

Banner.propTypes = {
  title: PropTypes.string, children: PropTypes.node
}

Banner.defaultProps = {
  title: 'Project Browser'
}
