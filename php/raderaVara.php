<?php
declare (strict_types=1);

// Läs in gemensamma funktioner
require_once "funktioner.php"; 

    // Kolla indata
    $kollatID = filter_input(INPUT_POST, "id" , FILTER_VALIDATE_INT);
    if (!$kollatID || $kollatID < 1) {
        $out = new stdClass();
        $out->error = ["Felaktig indata", "$id är inte giltigt"];
        return new Response($out, 400);
    }
    // Koppla mot databas
    $db = connectDB();
    
    // Förbered och exekvera SQL
    $stmt = $db -> prepare ("DELETE FROM varor WHERE id=:id");
    $stmt -> execute (["id"=>$kollatID]);
    
    // Skicka svar
    $antalPoster = $stmt->rowCount();
    if($antalPoster===0) {
        $out = new stdClass();
        $out -> result=false;
        $out -> message=["Radera post misslyckades", "Inga poster raderades"];
        return new Response($out);
    } else {
        $out = new stdClass();
        $out -> result=true;
        $out -> message=["Radera post lyckades", "$antalPoster poster raderades"];

    }
    // Skicka tillbaka svar
skickaJSON($out);
    

