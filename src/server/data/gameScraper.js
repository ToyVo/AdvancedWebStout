import https from 'https'
import fs from 'fs'
import xml2js from 'xml2js'
import path from 'path'
import * as BoardGame from './BoardGame'

const boardGames = []
let lastId = 1
fetchGames()

/**
 * keep fetching games until we have 100, then dump it to a json file
 */
function fetchGames () {
  fetchGame().then(() => {
    if (boardGames.length < 100) {
      fetchGames()
    } else {
      console.log(boardGames.length)
      fs.writeFileSync(path.join(__dirname, 'games.json'), JSON.stringify(boardGames))
    }
  })
}

/**
 * fetch a single game from bgg, if it is valid, parse it to a BoardGame and add it to the array
 */
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
                console.log(boardGames.length)
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

// preform get request to get data from url
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
