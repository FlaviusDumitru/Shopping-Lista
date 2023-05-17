<?php
declare (strict_types=1);

// Läs in gemensamma funktioner
require_once "funktioner.php";

    // Kontrollera id
    $kollatID = filter_var($id, FILTER_VALIDATE_INT);
    if (!$kollatID || $kollatID < 1) {
        $out = new stdClass();
        $out->error = ["Felaktig indata", "$id är inget giltigt heltal"];
        return new Response($out, 400);
    }
    try {
        //Koppla mot databas
        $db = connectDb();
        // Skicka radera-kommando
        $stmt = $db->prepare("DELETE FROM varor"
                . " WHERE id=:id");
        $stmt->execute(["id" => $kollatID]);
        $antalPoster = $stmt->rowCount();

        // Kontrollera databas-svar
        $out = new stdClass();
        if ($antalPoster > 0) {
            $out->result = true;
            $out->message = ["Radera lyckades", "$antalPoster post(er) raderades"];
        } else {
            $out->result = false;
            $out->message = ["Radera misslyckades", "Inga poster raderades"];
        }
        return new Response($out);
    } catch (Exception $ex) {
        $out = new stdClass();
        $out->error = ["Något gick fel vid radera", $ex->getMessage()];
        return new Response($out, 400);
    }
