<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>Module 1.2 - Movie Browser</title>

    <style>
        .movieSummary {
            border: 1px solid black;
            text-align: center;
            padding: 5px;
            margin-bottom: 15px;
            vertical-align: bottom;
        }

        .summaryTitle {
            display: block;
            font-size: medium;
            height: 4.5em;
        }

        .summaryInfo {
            display: block;
            font-size: medium;
            height: 5em;
        }
    </style>
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
            <div class="pb-2 mt-4 mb-2 border-bottom" style="width: 100%;">
                <h1>MyFlix Movie Browser</h1>
                Click on a movie below for more information.
            </div>
        </div>
        <?php
        // Establish the database connection
        include "database.php";
        $db = connectToDatabase(DBDeets::DB_NAME_MYFLIX);
        if ($db == NULL) {
            die("<p>Connection Error: " . $stmt->error . "</p></body></html>\n");
        }

        // Prepare and execute a query for the basic movie information
        $stmt = simpleQuery($db, "SELECT id, title, year, genres, image, rated FROM movies");
        if ($stmt == NULL) {
            die("<p>SQL Query Error: " . $stmt->error . "</p></body></html>\n");
        }

        // Bind variables to the results (same order as in the query)
        $stmt->bind_result($movieID, $movieName, $movieYear, $movieGenre, $movieImage, $movieRating);

        //Process the resutls and output in bootstrap grid form
        echo "      <div class='row'>\n";

        while ($stmt->fetch()) {
            // Output a cell for the current movie
        ?>
            <div class='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
                <div class='movieSummary'>
                    <a href='movieDetails.php?movieID=<?= $movieID ?>'>
                        <span class="summaryTitle"><?= $movieName ?></span>
                        <img src='./thumbs/<?= $movieImage ?>' style='height:250px;' />
                    </a><br>
                    <span class="summaryInfor"><?= $movieGenre ?><br><?= $movieYear ?> <?= $movieRating ?></span>
                </div> <!-- /movieSymmary-->
            </div> <!-- /col* -->
        <?php
        } //end of while loop

        echo "      </div> <!-- /row -->\n";

        // Close the database connection
        $stmt->close();
        $db->close();
        ?>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>

</html>