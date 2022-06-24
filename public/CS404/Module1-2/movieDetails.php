<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>Module 1.2 - Movie Details</title>
</head>

<body>
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/index.html">Collin Diekvoss</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Module 1
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="/CS404/Module1-1/index.html">1.1</a>
                        <a class="dropdown-item" href="/CS404/Module1-2/movieBrowse.php">1.2</a>
                        <a class="dropdown-item" href="/CS404/Module1-3/index.php">1.3</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="pb-2 mt-4 mb-2 border-bottom">
                <h1>MyFlix Movie Details</h1>
            </div>
        </div>
        <?php
        if (isset($_GET['movieID'])) {
            // Get ID of movie from form GET data
            $movieID = $_GET['movieID'];

            // 1. Connect to the database
            include "database.php";
            $db = connectToDatabase(DBDeets::DB_NAME_MYFLIX);
            if ($db->connect_error) {
                die('<p>Connection failed: ' . $DBconn->connect_error . '</p></div></body></html>');
            }

            // 2. Run the Query
            $query = "SELECT title,year,rated,imdbrating,description,image,genres,directors,writers,actors FROM movies WHERE id=?;";
            $stmt = simpleQueryParam($db, $query, "s", $movieID);
            if ($stmt == NULL) {
                die('</div></body></html>');
            }

            // 3. Bind and access the result variables
            if (!$stmt->bind_result(
                $movieName,
                $movieYear,
                $movieRated,
                $movieIMDB,
                $movieDesc,
                $movieImage,
                $movieGenres,
                $movieDirectors,
                $movieWriters,
                $movieActors
            )) {
                die('<p>Query Result Binding Failed: ' . $stmt->error . '</p></div></body></html>');
            }

            // Fetch and display the results
            if ($stmt->fetch()) {
                // TODO: Adjust the following to present all of this information in a more 
                //   organized format. You must use an image tag to display the full resolution
                //   poster, a table to organize all the data (or the Bootstrap column system),
                //   and CSS to keep things looking styled similar to the movieBrowse page.
                //   Feel free to use Bootstrap classes to achieve better styling.
        ?>
                <div class="row">
                    <div class="col-4">
                        <img src='./posters/<?= $movieImage ?>' />
                    </div>
                    <div class="col-8">
                        <h4>
                            <?= $movieName ?> - <?= $movieYear ?>
                            <h4>
                                <h6>
                                    <?= $movieDesc ?>
                                    <h6>
                                        <ul>
                                            <li>Rated <?= $movieRated ?></li>
                                            <li>IMDB Score = <?= $movieIMDB ?></li>
                                            <li>Genres = <?= $movieGenres ?></li>
                                            <li>Directors = <?= $movieDirectors ?></li>
                                            <li>Writers = <?= $movieWriters ?></li>
                                            <li>Actors = <?= $movieActors ?></li>
                                        </ul>
                    </div>
                </div>

            <?php
            }
        } else {
            ?>
            <p>Error: no movie ID provided.</p>
        <?php
        }
        ?>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>

</html>