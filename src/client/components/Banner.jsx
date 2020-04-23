import React from 'react'
import PropTypes from 'prop-types'
import GameGrid from './GameGrid.jsx'

class Banner extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='pb-2 mt-4 mb-2 border-bottom full-width'>
            <h1>{this.props.title}</h1>
            {this.props.children}
          </div>
          <GameGrid gamesData={this.props.gamesData}/>
        </div>
      </div>
    )
  }
}

Banner.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  gamesData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Banner
