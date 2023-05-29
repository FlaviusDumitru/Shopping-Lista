<?php
declare (strict_types=1);

// Läs in gemensamma funktioner
require_once "funktioner.php";

// Koppla mot databasen
$db = connectDB();

$listnr=filter_input(INPUT_POST, 'listnr', FILTER_SANITIZE_SPECIAL_CHARS);

// Hämta data
$sql ="SELECT id, namn, checked FROM varor WHERE ListNR=:listnr";
//$stmt=$db->query($sql);
$stmt = $db->prepare($sql);
$stmt->execute(['listnr' => $listnr]);

$rows=$stmt->fetchAll(PDO::FETCH_ASSOC);
$resultat=[];
foreach($rows as $post){
    $resultat[]=$post;
}


// Skicka svar
skickaJSON($resultat);
