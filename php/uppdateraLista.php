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

// Kontrollera indata
$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$lista = filter_input (INPUT_POST, 'lista', FILTER_SANITIZE_SPECIAL_CHARS);

$error = new stdClass();
$error -> meddelande = [];
if(!isset($id) || $id===false || $id<1) {
    // Felaktigt id, lägg till meddelande till felobjektet
    $error -> meddelande[] ="'id' saknas eller är felaktigt";
}

if (!isset($lista) || mb_strlen($lista)>50) {
    // Felaktigt vara, lägg till meddelande till felobjekt
    $error -> meddelande[] = "'lista' saknas eller är för långt"; 
}

// Har felobjektet några meddelanden
if (count($error -> meddelande)>0) {
    // Lägg till ett generellt meddelande först i arrayen
    array_unshift ($error->meddelande, "Bad request");
    skickaJSON($error, 400);
}
// Koppla databas
$db = connectDB();

// Uppdatera databas
$sql = "UPDATE lista set namn=:lista WHERE id=:id";
$stmt = $db->prepare ($sql);

$stmt -> execute (['id' => $id, 'lista' => $lista]);
// Returnera svar
if ($stmt -> rowCount()>0) {
    $out = new stdClass();
    $out -> meddelande = "OK";
    skickaJSON($out);
} else {
    $error = new stdClass();
    $error -> meddelande = ["Okänt fel" ,"Kunde inte uppdatera vara"];
    skickaJSON ($error, 400);
}