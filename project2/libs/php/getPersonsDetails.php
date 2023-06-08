<?php
$executionStartTime = microtime(true);

include("config.php");

header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname);

if (mysqli_connect_errno()) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

$query = $conn->prepare('SELECT `id`, `firstName`, `lastName`, `email`, `jobTitle`, `departmentID` FROM `personnel` WHERE `id` = ?');
$query->bind_param("i", $_REQUEST['id']);
$query->execute();

if (false === $query) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = [];
    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

$result = $query->get_result();
$personnel = [];

while ($row = mysqli_fetch_assoc($result)) {
    array_push($personnel, $row);
}

$departmentQuery = 'SELECT id, name from department ORDER BY name';
$departmentResult = $conn->query($departmentQuery);
$departments = [];

while ($departmentRow = mysqli_fetch_assoc($departmentResult)) {
    array_push($departments, $departmentRow);
}

$locationQuery = 'SELECT id, name FROM location';
$locationResult = $conn->query($locationQuery);
$locations = [];

while ($locationRow = mysqli_fetch_assoc($locationResult)) {
    array_push($locations, $locationRow);
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data']['personnel'] = $personnel;
$output['data']['departments'] = $departments;
$output['data']['locations'] = $locations;

mysqli_close($conn);

echo json_encode($output);
?>
