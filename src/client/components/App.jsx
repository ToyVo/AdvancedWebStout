import React from 'react'
import Axios from 'axios'
import Banner from './Banner.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gamesData: []
    }

    Axios.get('/api/games')
      .then((results) => {
        this.setState({
          gamesData: results.data
        })
      })
      .catch((e) => {
        console.error('unable to retrieve movies')
        console.error(e.message)
      })
  }

  render () {
    return (
      <div>
        <Banner gamesData={this.state.gamesData} title='Game Browser'>
          Click on a game for more information
        </Banner>
      </div>
    )
  }
}

export default App
