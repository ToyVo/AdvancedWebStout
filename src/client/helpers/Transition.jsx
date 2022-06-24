import Slide from '@material-ui/core/Slide'
import React from 'react'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default Transition
