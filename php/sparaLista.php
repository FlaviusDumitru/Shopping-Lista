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
$lista=filter_input(INPUT_POST, 'lista', FILTER_SANITIZE_SPECIAL_CHARS);
if (!isset($lista) || mb_strlen($lista)>25) {
    $error = new stdClass();
    $error -> meddelande=["Bad input", "Parametern 'namn' saknas eller är för lång (max 25 tecken)"];
    skickaJSON($error,400);
}

// Koppla mot databas
$db = connectDB();

// Spara data
$sql = "INSERT INTO lista (namn) VALUES (:lista)";
$stmt = $db -> prepare($sql);

$stmt -> execute(['lista'=>$lista]);
$id = $db->lastInsertId();

// Skicka tillbaka svar
skickaJSON(['id'=>$id]);