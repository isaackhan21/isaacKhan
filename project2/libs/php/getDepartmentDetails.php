<?php
$executionStartTime = microtime(true);

include("config.php");

header('Content-Type: application/json; charset=UTF-8');

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

$query = $conn->prepare('SELECT `id`, `name`, `locationID` FROM `department` WHERE `id` = ?');
$query->bind_param("i", $_REQUEST['id']);
$query->execute();

if (false === $query) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "Query failed";
    $output['data'] = [];
    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

$result = $query->get_result();
$department = [];

while ($row = mysqli_fetch_assoc($result)) {
    array_push($department, $row);
}

$locationQuery = 'SELECT id, name FROM location';
$locationResult = $conn->query($locationQuery);
$locations = [];

while ($locationRow = mysqli_fetch_assoc($locationResult)) {
    array_push($locations, $locationRow);
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "Success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data']['department'] = $department;
$output['data']['locations'] = $locations;

mysqli_close($conn);

echo json_encode($output);
?>
