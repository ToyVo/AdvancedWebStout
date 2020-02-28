// once the document is ready
$(document).ready(() => {
  // send an AJAX get request
  $.get(
    "movieBrowseJSON.php",
    data => {
      // process revieved movies
      const tiles = [];
      data.forEach((movie, i) => {
        tiles.push($(makeMovieTile(movie)));
      });
      // Mount the new tiles into the dom
      $("#movieGrid").append(tiles);

      $(".movieTileLink").click((event) => {
          event.preventDefault();
          console.log(event);
      })
    },
    "json"
  );
});

/**
 *
 * @param {id: string, title: string, year: number, genres: string, image: string, rated: string } movie
 */
function makeMovieTile(movie) {
  const movieTile = $.parseHTML(`
    <div class='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
        <div class='movieSummary'>
            <a href='movieDetails.php?movieID=${movie.id}' class='movieTileLink'>
                <span class="summaryTitle">${movie.title}</span>
                <img src='./thumbs/${movie.image}' style='height:250px;' />
            </a>
            <br>
            <span class="summaryInfo">${movie.genres}<br>${movie.year} ${movie.rating}</span>
        </div>
    </div>
    `);

    return movieTile;
}
