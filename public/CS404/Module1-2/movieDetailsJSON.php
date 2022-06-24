<?php
header("Content-Type: application/json");
if (isset($_GET['id'])) {
    // Get ID of movie from form GET data
    $movieID = $_GET['id'];

    // 1. Connect to the database
    include "database.php";
    $db = connectToDatabase(DBDeets::DB_NAME_MYFLIX);
    if ($db->connect_error) {
        http_response_code(500);
        die('{ "error": "Connection failed - "' . $db->connect_error . '" }');
    }

    // 2. Run the Query
    $query = "SELECT * FROM movies WHERE id=?;";
    $stmt = simpleQueryParam($db, $query, "s", $movieID);
    if ($stmt == NULL) {
        http_response_code(500);
        die('{ "error": "Query failed - "' . $db->error . '" }');
    }

    // 3. Get the results of the query
    if(!$results = $stmt->get_result()) {
        http_response_code(500);
        die('{ "error": "Failed to retrieve results- "' . $stmt->error . '" }');
    }

    // 4. Output as JSON
    if (($movie = $results->fetch_object()) != NULL) {
        echo json_encode($movie);
    } else {
        http_response_code(404);
        echo('{"error": "Movie not found"}');
    }

} else {
    http_response_code(400);
    echo('{"error": "no movie ID provided"}');
}
?>