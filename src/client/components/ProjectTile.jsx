import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => (
  {
    paper: {
      width: theme.spacing(32), margin: theme.spacing(1)
    },
    media: {
      height: theme.spacing(16)
    },
    title: {
      display: 'inline'
    },
    padLeft: {
      display: 'inline', paddingLeft: '10px'
    },
    cardContent: {
      padding: theme.spacing(1)
    }
  }
))

export default function ProjectTile (props) {
  const classes = useStyles()

  /**
   * when the tile is clicked, pass event up to open modal
   */
  const projectTileClicked = () => {
    props.activeProjectCallback(props.project._id)
  }

  return (
    <Grid item>
      <Card className={classes.paper}>
        <CardActionArea onClick={projectTileClicked}>
          {props.project.imageURLs[0] && <CardMedia className={classes.media} image={props.project.imageURLs[0]}/>}
          {!props.project.imageURLs[0] && <Skeleton variant='rect' className={classes.media}/>}
          <CardContent className={classes.cardContent}>
            <Typography variant='h5' component='h2' className={classes.title}>
              {props.project.name}
            </Typography>
            <Typography variant='h6' component='h2' color='textSecondary' className={classes.padLeft}>
              - {props.project.creator}
            </Typography>

            <Typography variant='body2' color='textSecondary' component='p'>
              Created: {props.project.publishDate}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Updated: {props.project.updateDate}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

ProjectTile.propTypes = {
  project: PropTypes.object.isRequired, activeProjectCallback: PropTypes.func.isRequired
}
