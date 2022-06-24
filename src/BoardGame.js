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
   * @param {string} designers list of contributing designers
   * @param {string} artists list of contributing artists
   * @param {string} publishers list of publishers for game
   * @param {number} id unique identifies corresponding to BGG game id
   */
  constructor(
    name,
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
    this.name = name;
    this.year = year;
    this.rating = rating;
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.minPlaytime = minPlaytime;
    this.maxPlaytime = maxPlaytime;
    this.minAge = minAge;
    this.designers = designers;
    this.artists = artists;
    this.publishers = publishers;
    this.id = id;
  }

  /**
   * @returns {string} a json formated string of this game
   */
  stringify() {
    return JSON.stringify(this);
  }

  /**
   * determines in what way to parse this game
   * @param {} jsonObject 
   */
  static parse(jsonObject) {
    // indicates that the object was parsed with XML2JS
    if (jsonObject.name) {
      return BoardGame.parseXML2JS(jsonObject)
    } else {
      console.log("JSON")
    }
  }

  /**
   * Create a BoardGame from XML2JS
   * @param {any} game a game already parsed from XML by XML2JS
   * @returns {BoardGame} board game object from xml
   */
  static parseXML2JS(game) {
    const name = game.name[0].$.value
    const year = game.yearpublished[0].$.value
    let rating = 0;
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
    for (const comment of game.comments[0].comment) {
      if (comment.$.rating !== 'N/A') {
        ratingCount++
        rating += Number.parseFloat(comment.$.rating)
      }
    }
    rating = rating / ratingCount
    return new BoardGame(name, year, rating, minPlayers, maxPlayers, minPlaytime, maxPlaytime, minAge, designers, artists, publishers, id)
  }

  /**
   * Parse a board game from JSON
   * @param {string} jsonObject
   * @returns {BoardGame} parsed board game
   */
  static parseJSON(jsonObject) {
    const obj = JSON.parse(jsonObject);
    return new BoardGame(
      obj.name,
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
    );
  }
}
