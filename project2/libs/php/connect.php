<?php
include 'config.php';


$mysqli = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname);
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}


$mysqli->close();
?>
