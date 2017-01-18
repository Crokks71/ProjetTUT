<?php

$con = mysql_connect(“localhost”,”root”,”root”);

if (!$con) {
die(‘Could not connect: ‘ . mysql_error());
}

mysql_select_db(“Mesures”, $con);

$result = mysql_query(“SELECT * FROM `mesure`”) or die (“Imposible”);

while($row = mysql_fetch_array($result)) {
echo $row[‘Temperature’] . “/” . $row[‘Humidite’]. “/” . $row[‘Pression’]. “/” . $row[‘Date’]. “/” ;
}

mysql_close($con);
?>