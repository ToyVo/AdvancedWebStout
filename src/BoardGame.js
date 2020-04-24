/**
 * a representation of a tabletop board game
 */
export default class BoardGame {
  /**
   * Constructor for boardGame
   * @param {string} name title of the game
   * @param {number} year year the game was published
   * @param {number} rating BGG rating assigned to game
   * @param {number} minPlayers minimum players needed to play the game
   * @param {number} maxPlayers maximum players that can play the game
   * @param {number} minPlaytime minimum estimated playtime
   * @param {number} maxPlaytime maximum estimated playtime
   * @param {number} minAge minimum recommended age for a player
   * @param {string[]} designers list of contributing designers
   * @param {string[]} artists list of contributing artists
   * @param {string[]} publishers list of publishers for game
   * @param {number} id unique identifies corresponding to BGG game id
   */
  constructor (name,
    year,
    rating,
    minPlayers,
    maxPlayers,
    minPlaytime,
    maxPlaytime,
    minAge,
    designers,
    artists,
    publishers,
    id
  ) {
    this.name = name
    this.year = year
    this.rating = rating
    this.minPlayers = minPlayers
    this.maxPlayers = maxPlayers
    this.minPlaytime = minPlaytime
    this.maxPlaytime = maxPlaytime
    this.minAge = minAge
    this.designers = designers
    this.artists = artists
    this.publishers = publishers
    this.id = id
  }

  /**
   * Create a BoardGame from XML2JS
   * @param {{name, yearpublished, minplayers, maxplayers, minplaytime, maxplaytime, minage, link, comments, $}} game a game already parsed from XML by XML2JS
   * @returns {BoardGame} board game object from xml
   */
  static parseXML2JS (game) {
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
    const id = game.$.id
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
    return new BoardGame(
      name,
      Number.parseInt(year),
      rating,
      Number.parseInt(minPlayers),
      Number.parseInt(maxPlayers),
      Number.parseInt(minPlaytime),
      Number.parseInt(maxPlaytime),
      Number.parseInt(minAge),
      designers,
      artists,
      publishers,
      Number.parseInt(id)
    )
  }

  /**
   * @returns {string} a json formated string of this game
   */
  stringify () {
    return JSON.stringify(this)
  }

  /**
   * determines in what way to parse this game
   * @param {string | {name, yearpublished, minplayers, maxplayers, minplaytime, maxplaytime, minage, link, comments, $} | {name, year, rating, minPlayers, maxPlayers, minPlaytime, maxPlaytime, minAge, designers, artists, publishers, id}} jsonObject
   */
  static parse (jsonObject) {
    if (jsonObject.link) {
      // will be an object parsed by XML2JS
      return BoardGame.parseXML2JS(jsonObject)
    } else if (jsonObject.id) {
      // will be a javascript object, missing functions of BoardGame
      return BoardGame.parseJsObject(jsonObject)
    } else {
      // will be a plain JSON string
      return BoardGame.parseJSON(jsonObject)
    }
  }

  /**
   * #return {string} a json formatted string containing minimal information
   */
  stringifyPartial () {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      year: this.year
    })
  }

  /**
   * Parse a board game from JSON
   * @param {string} jsonObject
   * @returns {BoardGame} parsed board game
   */
  static parseJSON (jsonObject) {
    const obj = JSON.parse(jsonObject)
    return BoardGame.parseJsObject(obj)
  }

  /**
   * transforms a js object to a boardGame object
   * @param {{name, year, rating, minPlayers, maxPlayers, minPlaytime, maxPlaytime, minAge, designers, artists, publishers, id}} obj
   * @returns {BoardGame}
   */
  static parseJsObject (obj) {
    return new BoardGame(obj.name,
      obj.year,
      obj.rating,
      obj.minPlayers,
      obj.maxPlayers,
      obj.minPlaytime,
      obj.maxPlaytime,
      obj.minAge,
      obj.designers,
      obj.artists,
      obj.publishers,
      obj.id
    )
  }
}
