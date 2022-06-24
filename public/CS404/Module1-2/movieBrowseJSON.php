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
$contimue = $stmt->fetch();
?>
[
<?php

while ($contimue) {
    // Output JSON for all movies
?>
    {
    "id":"<?= $movieID ?>",
    "title":"<?= $movieName ?>",
    "year":<?= $movieYear ?>,
    "genres":"<?= $movieGenre ?>",
    "image":"<?= $movieImage ?>",
    "rated":"<?= $movieRating ?>"
    }
    <?php if ($stmt->fetch()) { ?>
        ,
    <?php } else {
        $contimue = false;
    } ?>
<?php } //close while ?>
]
<?php
// Close the database connection
$stmt->close();
$db->close();
?>