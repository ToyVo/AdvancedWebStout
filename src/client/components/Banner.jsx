import React from 'react'
import PropTypes from 'prop-types'

export default function Banner (props) {
  return (<div className='pb-2 mt-4 mb-2 border-bottom full-width'>
    <h1>{props.title}</h1>
    {props.children}
  </div>)
}

Banner.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

Banner.defaultProps = {
  title: 'Board Game Browser'
}
