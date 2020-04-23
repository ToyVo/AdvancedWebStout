import React from 'react'
import PropTypes from 'prop-types'

class Banner extends React.Component {
  render () {
    return (
      <div className='pb-2 mt-4 mb-2 border-bottom full-width'>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    )
  }
}

Banner.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default Banner
