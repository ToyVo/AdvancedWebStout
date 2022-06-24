import https from 'https'
import fs from 'fs'
import xml2js from 'xml2js'
import BoardGame from './BoardGame'

const boardGames = []
let lastId = 1
fetchGames()

async function fetchGames() {
  let game = null;
  while (boardGames.length < 100) {
    game = await fetchGame()
    boardGames.push(game)
    console.log(boardGames)
  }

}

function fetchGame() {
  return new Promise((res, rej) => {
    let url = `https://www.boardgamegeek.com/xmlapi2/thing?comments=1&id=${lastId++}`
    retrieveData(url)
      .then(data => {
        xml2js.parseString(data, (err, result) => {
          if (err) rej(err)
          if (result.items.item) {
            res(BoardGame.parse(result.items.item[0]))
          }
        })
      })
      .catch(e => {
        rej(e)
      })
  })
}

function retrieveData(url) {
  return new Promise((resolve, reject) => {
    // send GET request to url
    https.get(url, response => {
      let rawData = '';
      response.on('data', chunk => rawData += chunk)
      response.on('end', () => resolve(rawData))
    }).on('error', err => reject(err))
  })
}
