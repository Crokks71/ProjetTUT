<?php

$base = mysql_connect ('localhost', 'root', 'root');
mysql_select_db ('Mesures', $base) ;
$delete = 'DELETE FROM mesure';
mysql_query($delete);
$contenueDuFichier = file_get_contents("/root/Desktop/NRF24L01/Mesures.txt");
$ligneParLigne = explode("\n", $contenueDuFichier);
$date ="";
foreach ($ligneParLigne as $ligne) {
        $ligne = trim($ligne);
        $tab_line = explode(",",$ligne);
        $date =$tab_line[4];
        $temp =$tab_line[0];
        $pres = $tab_line[2];
        $hum =$tab_line[1];
        $sql="INSERT INTO mesure VALUES ('".$temp."', '".$hum."', '".$pres."', '".$date."')";
        mysql_query ($sql) or die ('Erreur SQL !'.$sql.'<br />'.mysql_error());
}
$del="DELETE FROM mesure WHERE Temperature=0.00";
mysql_query ($del);
mysql_close();
?>
