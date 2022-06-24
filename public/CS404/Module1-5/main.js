import BoardGame from "./BoardGame.js";

// once the document is ready
$(document).ready(() => {
  // populate the game entries
  populateGrid();

  // get the form and grab the submit listener using non jquery methods
  const form = document.getElementById("newGameForm");
  form.addEventListener(
    "submit",
    event => {
      // prevent page reloading
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity() === false) {
        // apply validation css
        form.classList.add("was-validated");
      } else {
        submitGame();
      }
    },
    false
  );

  // When the add game model gets closed reset the form and any alerts
  $("#addGameModal").on("hidden.bs.modal", e => {
    form.reset();
    form.classList.remove("was-validated");
    $("#addGameAlert").addClass("hidden");
  });

  // open up add game modal, disallow dismissing by clicking on backdrop
  $("#addGameButton").click(() => {
    $("#addGameModal").modal({ backdrop: "static" });
  });
});

/**
 * populate the game list grid with entries from the database
 */
function populateGrid() {
  // Send AJAX Get request
  $.get(
    "get.php",
    data => {
      // process revieved games
      const tiles = [];
      data.forEach((game, i) => {
        tiles.push(makeGameTile(game));
      });
      // Mount the new tiles into the dom
      $("#gameGrid").html(tiles);
    },
    "json"
  );
}

/**
 * perform the post request to submit a game from the form to the database
 */
function submitGame() {
  // get all values from the form
  const name = $("#newGameName").val();
  const year = $("#newGameYear").val();
  const rating = $("#newGameRating").val();
  const minPlayers = $("#newGameMinPlayers").val();
  const maxPlayers = $("#newGameMaxPlayers").val();
  const minPlaytime = $("#newGameMinPlayTime").val();
  const maxPlaytime = $("#newGameMaxPlayTime").val();
  const minAge = $("#newGameMinAge").val();
  const designers = $("#newGameDesigners").val();
  const artists = $("#newGameArtists").val();
  const publishers = $("#newGamePublishers").val();
  const id = $("#newGameID").val();

  // create game object
  const game = new BoardGame(
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
  );

  // submit game to post api
  $.post("post.php", game.stringify())
    .done(() => {
      // close modal and update game list
      $("#addGameModal").modal("hide");
      populateGrid();
    })
    .fail(() => {
      // show alert
      $("#addGameAlert").removeClass("hidden");
    });
}

/**
 * Create an html element for a
 * @param {BoardGame} game
 */
function makeGameTile(game) {
  const gameTitle = $("<div>")
    .addClass("col-xs-6 col-sm-6 col-md-4 col-lg-3")
    .append(
      $("<div>")
        .addClass("gameSummary")
        .append(
          $("<a>")
            .addClass("gameTitleLink")
            .click(() => {
              openGameModal(game.id);
            })
            .append(
              $("<span>")
                .addClass("summaryTitle")
                .text(game.name)
            )
        )
    );

  return gameTitle;
}

/**
 * open game details
 * @param {number} gameID
 */
function openGameModal(gameID) {
  $.get(
    `get.php?id=${gameID}`,
    data => {
      $("#boardGameModalLabel").text(`${data.name} - ${data.year}`);
      const list = $("#boardGameModalBody").html($("<ul>"));
      if (data.rating) {
        list.append($("<li>").text(`Rated ${data.rating} out of 10.`));
      }

      if (data.maxPlayers) {
        list.append(
          $("<li>").text(
            `For ${data.minPlayers ? data.minPlayers : "up"} to ${
              data.maxPlayers
            } players.`
          )
        );
      } else if (data.minPlayers) {
        list.append($("<li>").text(`For ${data.minPlayers} players.`));
      }

      if (data.maxPlayers) {
        list.append(
          $("<li>").text(
            `Takes ${data.minPlaytime ? data.maxPlayers : "up"} to ${
              data.maxPlaytime
            } minutes.`
          )
        );
      } else if (data.minPlaytime) {
        list.append($("<li>").text(`Takes ${data.minPlaytime} minutes.`));
      }

      if (data.minAge) {
        list.append($("<li>").text(`For ages ${data.minAge} and up.`));
      }

      if (data.designers) {
        list.append($("<li>").text(`Designed by ${data.designers}.`));
      }

      if (data.artists) {
        list.append($("<li>").text(`Art by ${data.artists}.`));
      }

      if (data.publishers) {
        list.append($("<li>").text(`Published by ${data.publishers}.`));
      }
    },
    "json"
  );
  $("#boardGameModal").modal();
}
