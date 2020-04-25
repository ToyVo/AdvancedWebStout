/**
 * Create a BoardGame from XML2JS
 * @param {{
 *   name,
 *   yearpublished,
 *   minplayers,
 *   maxplayers,
 *   minplaytime,
 *   maxplaytime,
 *   minage,
 *   link,
 *   comments,
 *   $
 * }} game a game already parsed from XML by XML2JS
 * @returns {{
 *   name: string,
 *   year: number,
 *   rating: number,
 *   minPlayers: number,
 *   maxPlayer: number,
 *   minPlaytime: number,
 *   maxPlaytime: number,
 *   minAge: number,
 *   designers: string[],
 *   artists: string[],
 *   publishers: string[]
 * }} board game object from xml
 */
function parseXML2JS (game) {
  const name = game.name[0].$.value
  const year = game.yearpublished[0].$.value
  let rating = 0
  const minPlayers = game.minplayers[0].$.value
  const maxPlayers = game.maxplayers[0].$.value
  const minPlaytime = game.minplaytime[0].$.value
  const maxPlaytime = game.maxplaytime[0].$.value
  const minAge = game.minage[0].$.value
  const designers = []
  const artists = []
  const publishers = []
  for (const link of game.link) {
    if (link.$.type === 'boardgamedesigner') {
      designers.push(link.$.value)
    } else if (link.$.type === 'boardgameartist') {
      artists.push(link.$.value)
    } else if (link.$.type === 'boardgamepublisher') {
      publishers.push(link.$.value)
    }
  }
  let ratingCount = 0
  if (game.comments && game.comments[0]) {
    for (const comment of game.comments[0].comment) {
      if (comment.$.rating !== 'N/A') {
        ratingCount++
        rating += Number.parseFloat(comment.$.rating)
      }
    }
  }

  rating = rating / ratingCount
  return {
    name: name || null,
    year: Number.parseInt(year) || null,
    rating: rating || null,
    minPlayers: Number.parseInt(minPlayers) || null,
    maxPlayers: Number.parseInt(maxPlayers) || null,
    minPlaytime: Number.parseInt(minPlaytime) || null,
    maxPlaytime: Number.parseInt(maxPlaytime) || null,
    minAge: Number.parseInt(minAge) || null,
    designers: designers || [],
    artists: artists || [],
    publishers: publishers || []
  }
}

/**
 * determines in what way to parse this game
 * @param {string |{
 *    name,
 *    yearpublished,
 *    minplayers,
 *    maxplayers,
 *    minplaytime,
 *    maxplaytime,
 *    minage,
 *    link,
 *    comments,
 *    $
 * }} jsonObject to be parsed into a js object
 * @returns {{
 *   name: string,
 *   year: number,
 *   rating: number,
 *   minPlayers: number,
 *   maxPlayer: number,
 *   minPlaytime: number,
 *   maxPlaytime: number,
 *   minAge: number,
 *   designers: string[],
 *   artists: string[],
 *   publishers: string[]
 * }} board game object from xml
 */
function parse (jsonObject) {
  if (jsonObject.link) {
    // will be an object parsed by XML2JS
    return parseXML2JS(jsonObject)
  } else {
    // will be a plain JSON string
    return parseJSON(jsonObject)
  }
}

/**
 * Parse a board game from JSON
 * @param {string} jsonObject
 * @returns {{
 *   name: string,
 *   year: number,
 *   rating: number,
 *   minPlayers: number,
 *   maxPlayers: number,
 *   minPlaytime: number,
 *   maxPlaytime: number,
 *   minAge: number,
 *   designers: string[],
 *   artists: string[],
 *   publishers: string[]
 * }} parsed boardGame Object
 */
function parseJSON (jsonObject) {
  const obj = JSON.parse(jsonObject)
  return {
    name: obj.name || null,
    year: obj.year || null,
    rating: obj.rating || null,
    minPlayers: obj.rating || null,
    maxPlayers: obj.maxPlayers || null,
    minPlaytime: obj.minPlaytime || null,
    maxPlaytime: obj.maxPlaytime || null,
    minAge: obj.minAge || null,
    designers: obj.publishers || [],
    artists: obj.artists || [],
    publishers: obj.publishers || []
  }
}

export { parseXML2JS, parseJSON, parse }
