<?php
declare (strict_types=1);

// Läs in gemensamma funktioner
require_once "funktioner.php";

// Kontrollera anropsmetod
if ($_SERVER['REQUEST_METHOD']!=='POST') {
    $error = new stdClass ();
    $error -> meddelande= ["Wrong method", "Sidan ska anropas med POST"];
    skickaJSON($error, 405);
}

//Koppla mot databas
$db = connectDb();

// Radera alla varor
$sql = "DELETE FROM lista";
$db -> query($sql);

// Skicka svar 
skickaJSON(["meddelande" => "ok"]);

