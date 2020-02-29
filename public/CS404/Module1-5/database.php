<?php
// Secret database details
abstract class DBDeets
{
  const DB_NAME_BOARDGAME = 'boardgame';
  const DB_USER = 'boardgameuser';
  const DB_PW = 'boardgamepassword';
  const DB_SILENT_FAIL = FALSE;
}

function connectToDatabase($databaseName)
{
  // Attempt to connect using the constants from above 
  $db = new mysqli('localhost', DBDeets::DB_USER, DBDeets::DB_PW, $databaseName);

  // Detect and report any errors (if SILENT_FAIL is not true)
  if ($db->connect_errno && !DBDeets::DB_SILENT_FAIL) {
    http_response_code(500);
    die('{ "error": "FAILED DB CONNECT - ' . $db->connect_errno . $db->connect_error . '" }');
  }

  // Return the handle to the mysql connection (which may be in an error state)
  return $db;
}

function simpleQuery($db, $query)
{
  // Prepare the query using the passed in db connection
  if (!($stmt = $db->prepare($query))) {
    if (!DBDeets::DB_SILENT_FAIL) {
      http_response_code(500);
      die('{ "error": "FAILED QUERY PREPARE - ' . $db->errno . $db->error . '" }');
    }
    return null;
  }

  // Execute the prepared query
  if (!$stmt->execute()) {
    if (!DBDeets::DB_SILENT_FAIL) {
      http_response_code(500);
      die('{ "error": "FAILED QUERY EXECUTE - check that database and statement are still open and valid" }');
    }
    return null;
  }

  // If it is a SELECT query, cache the results for quick access
  if (strpos($query, 'SELECT') !== false) {
    $stmt->store_result();
  }

  // return the statement object
  return $stmt;
}

function simpleQueryParam($db, $query, $ptype, &$param)
{
  // Prepare the query
  if (!($stmt = $db->prepare($query))) {
    if (!DBDeets::DB_SILENT_FAIL) {
      http_response_code(500);
      die('{ "error": "FAILED QUERY PREPARE - ' . $db->errno . $db->error . '" }');
    }
    return null;
  }

  // Bind input param
  if (!($stmt->bind_param($ptype, $param))) {
    if (!DBDeets::DB_SILENT_FAIL) {
      http_response_code(500);
      die('{ "error": "FAILED BIND PARAM - Did you leave a ? in your query" }');
    }
    return null;
  }

  // Execute query
  if (!$stmt->execute()) {
    if (!DBDeets::DB_SILENT_FAIL) {
      http_response_code(500);
      die('{ "error": "FAILED QUERY EXECUTE - check that database and statement are still open and valid" }');
    }
    return null;
  }

  // return the statement object
  return $stmt;
}

function complexQueryParam($db, $query, $ptype, &...$params)
{
  // Prepare the query
  if (!($stmt = $db->prepare($query))) {
    if (!DBDeets::DB_SILENT_FAIL) {
      http_response_code(500);
      die('{ "error": "FAILED QUERY PREPARE - ' . $db->errno . $db->error . '" }');
    }
    return null;
  }

  // Bind input param
  if (!($stmt->bind_param($ptype, ...$params))) {
    if (!DBDeets::DB_SILENT_FAIL) {
      http_response_code(500);
      die('{ "error": "FAILED BIND PARAM - Did you leave the proper number and types of ?s in your query" }');
    }
    return null;
  }

  // Execute query
  if (!$stmt->execute()) {
    if (!DBDeets::DB_SILENT_FAIL) {
      http_response_code(500);
      die('{ "error": "FAILED QUERY EXECUTE - check that database and statement are still open and valid" }');
    }
    return null;
  }

  // Store the results for SELECT queries
  if (strpos($query, 'SELECT') !== false) {
    $stmt->store_result();
  }

  // return the statement object
  return $stmt;
}
