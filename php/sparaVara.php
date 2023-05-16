<?php
declare (strict_types=1);

// Inkludera gemensamma funktioner
require_once "funktioner.php";

// Läs indata och saner
// Kontrollera metod
if ($_SERVER['REQUEST_METHOD']!=='POST') {
    $error = new stdClass ();
    $error -> meddelande= ["Wrong method", "Sidan ska anropas med POST"];
    skickaJSON($error, 405);
}

// Läs indata
$vara=filter_input(INPUT_POST, 'vara', FILTER_SANITIZE_SPECIAL_CHARS);
if (!isset($vara) || mb_strlen($vara)>30) {
    $error = new stdClass();
    $error -> meddelande=["Bad input", "Parametern 'vara' saknas eller är för lång (max 30 tecken)"];
    skickaJSON($error,400);
}

// Koppla mot databas
$db = connectDB();

// Spara data
$sql = "INSERT INTO varor (namn) VALUES (:vara)";
$stmt = $db -> prepare($sql);

$stmt -> execute(['vara'=>$vara]);
$id = $db->lastInsertId();

// Skicka tillbaka svar
skickaJSON(['id'=>$id]);