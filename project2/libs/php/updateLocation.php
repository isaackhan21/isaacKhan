<?php
include("config.php");

header('Content-Type: application/json; charset=UTF-8');

$executionStartTime = microtime(true);

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname);

if (mysqli_connect_errno()) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "Database connection failed";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
    echo json_encode($output);
    exit;
}

$id = $_REQUEST['id'];
$name = $_REQUEST['name'];

$query = $conn->prepare('UPDATE location SET name = ? WHERE id = ?');
$query->bind_param("si", $name, $id);
$query->execute();

if ($query) {
    $output['status']['code'] = "200";
    $output['status']['name'] = "success";
    $output['status']['description'] = "Location details updated";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
} else {
    $output['status']['code'] = "400";
    $output['status']['name'] = "error";
    $output['status']['description'] = "Failed to update location details";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
}

$query->close();
mysqli_close($conn);

echo json_encode($output);
?>
