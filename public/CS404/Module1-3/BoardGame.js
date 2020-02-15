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
   * @param {number} minAge minimum reccomended age for a player
   * @param {string[]} designers list of contributing designers
   * @param {string[]} artists list of contributing artits
   * @param {string[]} publishers list of publishers for game
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

  stringify() {
    return JSON.stringify(this);
  }

  parse(jsonObject) {
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
