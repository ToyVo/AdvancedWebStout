import React from 'react'
import Banner from './Banner.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gamesData: [
        {
          name: 'Die Macher',
          year: '1986',
          rating: 7.70068493150685,
          minPlayers: '3',
          maxPlayers: '5',
          minPlaytime: '240',
          maxPlaytime: '240',
          minAge: '14',
          designers: ['Karl-Heinz Schmiel'],
          artists: ['Marcus Gschwendtner', 'Harald Lieske'],
          publishers: [
            'Hans im Glück',
            'Moskito Spiele',
            'Spielworxx',
            'sternenschimmermeer',
            'Stronghold Games',
            'Valley Games, Inc.',
            'YOKA Games'
          ],
          id: '1'
        },
        {
          name: 'Dragonmaster',
          year: '1981',
          rating: 6.668115942028986,
          minPlayers: '3',
          maxPlayers: '4',
          minPlaytime: '30',
          maxPlaytime: '30',
          minAge: '12',
          designers: ["G. W. \"Jerry\" D'Arcey"],
          artists: ['Bob Pepper'],
          publishers: ['E.S. Lowe', 'Milton Bradley'],
          id: '2'
        },
        {
          name: 'Samurai',
          year: '1998',
          rating: 7.629411764705883,
          minPlayers: '2',
          maxPlayers: '4',
          minPlaytime: '30',
          maxPlaytime: '60',
          minAge: '10',
          designers: ['Reiner Knizia'],
          artists: ['Franz Vohwinkel'],
          publishers: [
            'Fantasy Flight Games',
            'Hans im Glück',
            '999 Games',
            'ABACUSSPIELE',
            'Astrel Games',
            'Ceilikan Jogos',
            'Descartes Editeur',
            'Edge Entertainment',
            'Galakta',
            'Hobby Japan',
            'Korea Boardgames co., Ltd.',
            'Lacerta',
            'Lautapelit.fi',
            'Rio Grande Games',
            'Skandinavisk  Spil Kompagni',
            'Smart Ltd',
            'Wargames Club Publishing'
          ],
          id: '3'
        },
        {
          name: 'Tal der Könige',
          year: '1992',
          rating: 6.550675675675675,
          minPlayers: '2',
          maxPlayers: '4',
          minPlaytime: '60',
          maxPlaytime: '60',
          minAge: '12',
          designers: ['Christian Beierer'],
          artists: ['Thomas di Paolo'],
          publishers: ['KOSMOS'],
          id: '4'
        },
        {
          name: 'Acquire',
          year: '1964',
          rating: 7.533536585365853,
          minPlayers: '2',
          maxPlayers: '6',
          minPlaytime: '90',
          maxPlaytime: '90',
          minAge: '12',
          designers: ['Sid Sackson'],
          artists: ['Scott Okumura', 'Peter Whitley'],
          publishers: [
            '3M',
            'The Avalon Hill Game Co',
            'Avalon Hill Games, Inc.',
            'Dujardin',
            'Grow Jogos e Brinquedos',
            'PS-Games',
            'Schmidt France',
            'Schmidt International',
            'Schmidt Spiele',
            'Selecta Spel en Hobby',
            'Smart Games, Inc.'
          ],
          id: '5'
        }
      ]
    }
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
