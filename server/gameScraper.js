import https from 'https'
import fs from 'fs'
import xml2js from 'xml2js'
import BoardGame from './public/js/BoardGame'

const boardGames = []
let lastId = 1
fetchGames()

function fetchGames () {
  fetchGame().then(game => {
    if (boardGames.length < 100) {
      fetchGames()
    } else {
      console.log(boardGames.length)
      fs.writeFileSync('games.json', JSON.stringify(boardGames))
    }
  })
}

function fetchGame () {
  return new Promise((resolve, reject) => {
    const url = `https://www.boardgamegeek.com/xmlapi2/thing?comments=1&id=${lastId++}`
    retrieveData(url)
      .then(data => {
        xml2js.parseString(data, (err, result) => {
          if (err) reject(err)
          if (result) {
            if (result.items) {
              if (result.items.item) {
                const game = BoardGame.parse(result.items.item[0])
                boardGames.push(game)
                console.log(game)
              }
            }
          }
          resolve()
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}

function retrieveData (url) {
  return new Promise((resolve, reject) => {
    // send GET request to url
    https.get(url, response => {
      let rawData = ''
      response.on('data', (chunk) => {
        rawData += chunk
      })
      response.on('end', () => resolve(rawData))
    }).on('error', err => reject(err))
  })
}