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

// Koppla databas
$db = connectDb();

$listnr=filter_input(INPUT_POST, "listnr", FILTER_VALIDATE_INT);
if (!$listnr || $listnr<1) {
    $error = new stdClass();
    $error -> meddelande =["Bad request", "'listnr' saknas eller är ogiltigt"];
    skickaJSON($error, 400);
}
// Radera valda varor
$sql = "DELETE FROM varor WHERE checked=1 AND ListNR = :listnr";
$stmt = $db -> prepare($sql);
$stmt -> execute(['listnr' => $listnr]);

// Skicka svar
$out = new stdClass ();
$out -> meddelande ="Ok";
skickaJSON($out);