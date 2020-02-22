<?php
header("Content-Type: application/json");

// 1. Connect to the database
include "database.php";
$db = connectToDatabase(DBDeets::DB_NAME_BOARDGAME);
if ($db->connect_error) {
    http_response_code(500);
    die('{ "error": "Connection failed - "' . $db->connect_error . '" }');
}

if (isset($_GET['id'])) {
    // Get ID of movie from form GET data
    $gameID = $_GET['id'];

    // 2. Run the Query
    $query = "SELECT * FROM boardgames WHERE id=?;";
    $stmt = simpleQueryParam($db, $query, "s", $gameID);
    if ($stmt == NULL) {
        http_response_code(500);
        die('{ "error": "Query failed - "' . $stmt->error . '" }');
    }

    // 3. Get the results of the query
    if(!$results = $stmt->get_result()) {
        http_response_code(500);
        die('{ "error": "Failed to retrieve results- "' . $stmt->error . '" }');
    }

    // 4. Output as JSON
    if (($game = $results->fetch_object()) != NULL) {
        echo json_encode($game);
    } else {
        http_response_code(404);
        echo('{"error": "Game not found"}');
    }

} else {
    $stmt = simpleQuery($db, "SELECT id, name, publishers FROM boardgames");
    if ($stmt == NULL) {
        http_response_code(500);
        die('{ "error": "Query failed - "' . $stmt->error . '" }');
    }
    $stmt->bind_result($gameID, $gameName, $gamePublishers);
    $contimue = $stmt->fetch();
    echo "[";
    while ($contimue) {
        echo('{');
        echo('"id":', json_encode($gameID), ',');
        echo('"name":', json_encode($gameName), ',');
        echo('"publishers":', json_encode($gamePublishers))
        echo('}')
        if($stmt->fetch()) {
            echo(",");
        } else {
            $contimue = false;
        }
    }
    echo("]");
}

$stmt->close();
$db->close();
?>