<?php
declare (strict_types=1);

// Läs in gemensamma funktioner
require_once "funktioner.php";

// Koppla mot databasen
$db = connectDB();

// Hämta data
$sql ="SELECT id, namn, checked FROM varor";
$stmt=$db->query($sql);

$rows=$stmt->fetchAll(PDO::FETCH_ASSOC);
$resultat=[];
foreach($rows as $post){
    $resultat[]=$post;
}


// Skicka svar
skickaJSON($resultat);

