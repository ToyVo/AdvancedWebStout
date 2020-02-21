<?php
header("Content-Type: application/json");

// Establish the database connection
include "database.php";
$db = connectToDatabase(DBDeets::DB_NAME_MYFLIX);
if ($db == NULL) {
    http_response_code(500);
    die('{ "error": "Connection Error - "' . $$db->error . '" }');
}

// Prepare and execute a query for the basic movie information
$stmt = simpleQuery($db, "SELECT id, title, year, genres, image, rated FROM movies");
if ($stmt == NULL) {
    http_response_code(500);
    die('{ "error": Query Error - ' . $stmt->error . '" }');
}

// Bind variables to the results (same order as in the query)
$stmt->bind_result($movieID, $movieName, $movieYear, $movieGenre, $movieImage, $movieRating);

$contimue = $stmt->fetch();
echo "[";
while ($contimue) {
    // Output JSON for all movies
?>{
"id":"<?= $movieID ?>",
"title":"<?= $movieName ?>",
"year":<?= $movieYear ?>,
"genres":"<?= $movieGenre ?>",
"image":"<?= $movieImage ?>",
"rated":"<?= $movieRating ?>"
}<?php if ($stmt->fetch()) { ?>,
<?php } else {
        $contimue = false;
    } ?>
<?php } //close while 
echo "]";
// Close the database connection
$stmt->close();
$db->close();
?>