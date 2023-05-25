<?php
declare (strict_types = 1);
require_once  "../php/funktioner.php";

try {
    // Skapa handle till cUrl för att läsa svaret
    $ch = curl_init ('http://localhost/Shoppinglista/php/raderaValda.php');

    // Se till att vi får svaret som en sträng
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Anropen till sidan som ska testas
    // Fel metod
    echo "<p class = 'info'> Test fel metod</p>";
    felMetod($ch);
    
    // Test ok
    echo "<p class = 'info'> Test radera valda OK</p>";
   raderaValda($ch);

} catch (Exception $e) {
    echo "<p class = 'error'>";
    echo "Något gick JÄTTEfell!<br>";
    echo $e -> getMessage ();
    echo $e->getFile();
    echo "</p>";
}
