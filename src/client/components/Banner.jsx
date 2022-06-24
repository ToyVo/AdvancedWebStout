import React from 'react'

export default class Banner extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
            <h1>Hello {this.props.greeting}</h1>
          </div>
        </div>
      </div>
    )
  }
}
