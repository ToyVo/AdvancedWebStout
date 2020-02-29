<?php
header("Content-Type: application/json");

$entityBody = file_get_contents('php://input');
$newGame = json_decode($entityBody);

// connect to database
include "database.php";
$db = connectToDatabase(DBDeets::DB_NAME_BOARDGAME);
if ($db->connect_error) {
  http_response_code(500);
  die('{ "error": "Connection failed - ' . $db->connect_error . '" }');
}

// check that all required information has been passed in
if (!($newGame->name && $newGame->year && $newGame->id)) {
  http_response_code(400);
  die('{ "error": "Must pass in name, year and id and optionally: rating, minPlayers, maxPlayers, minPlaytime, maxPlaytime, minAge, designers, artists, and publishers" }');
}

// set basic defaults if they are not passed in
if ($newGame->rating) {
  $rating = $newGame->rating;
} else {
  $rating = null;
}
if ($newGame->minPlayers) {
  $minPlayers = $newGame->minPlayers;
} else {
  $minPlayers = null;
}
if ($newGame->maxPlayers) {
  $maxPlayers = $newGame->maxPlayers;
} else {
  $maxPlayers = null;
}
if ($newGame->minPlaytime) {
  $minPlaytime = $newGame->minPlaytime;
} else {
  $minPlaytime = null;
}
if ($newGame->maxPlaytime) {
  $maxPlaytime = $newGame->maxPlaytime;
} else {
  $maxPlaytime = null;
}
if ($newGame->minAge) {
  $minAge = $newGame->minAge;
} else {
  $minAge = null;
}
if ($newGame->designers) {
  $designers = $newGame->designers;
} else {
  $designers = null;
}
if ($newGame->artists) {
  $artists = $newGame->artists;
} else {
  $artists = null;
}
if ($newGame->publishers) {
  $publishers = $newGame->publishers;
} else {
  $publishers = null;
}

// insert json into database
$query = "INSERT INTO boardgames (name, year, rating, minPlayers, maxPlayers, minPlaytime, maxPlaytime, minAge, designers, artists, publishers, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
$stmt = complexQueryParam($db, $query, "sidiiiiisssi", $newGame->name, $newGame->year, $rating, $minPlayers, $maxPlayers, $minPlaytime, $maxPlaytime, $minAge, $designers, $artists, $publishers, $newGame->id);
if ($stmt == NULL) {
  http_response_code(500);
  die('{ "error": "Query failed - ' . $stmt->error . '" }');
}

echo "{}";

$stmt->close();
$db->close();
