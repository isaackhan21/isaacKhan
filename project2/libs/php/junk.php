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

$searchQuery = $_REQUEST['search'];
$departmentID = $_REQUEST['department'];

$query = "SELECT personnel.id AS personnelID, personnel.firstName, personnel.lastName, personnel.email, personnel.departmentID, department.id AS departmentID, department.name AS department, department.locationID, location.id AS locationID, location.name AS location FROM personnel 
          LEFT JOIN department ON personnel.departmentID = department.id
          LEFT JOIN location ON department.locationID = location.id
          WHERE (personnel.firstName LIKE ? OR
                 personnel.lastName LIKE ? OR
                 personnel.email LIKE ? OR
                 department.name LIKE ? OR
                 location.name LIKE ?)";

$searchQuery = "%$searchQuery%";
$params = array($searchQuery, $searchQuery, $searchQuery, $searchQuery, $searchQuery);

if (!empty($departmentID)) {
    $departmentIDs = explode(',', $departmentID);
    $departmentIDCondition = implode(',', array_fill(0, count($departmentIDs), '?'));
    $query .= " AND departmentID IN ($departmentIDCondition)";
    $params = array_merge($params, $departmentIDs);
}

$stmt = $conn->prepare($query);

if (!$stmt) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "query preparation failed";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;
}

$types = str_repeat('s', count($params));
$stmt->bind_param($types, ...$params);

$stmt->execute();

$result = $stmt->get_result();

if (!$result) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "query failed";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;
}

$personnelData = array();
$departmentsData = array();
$locationsData = array();

while ($row = $result->fetch_assoc()) {
    $personnelData[] = array(
        "id" => $row['personnelID'],
        "firstName" => $row['firstName'],
        "lastName" => $row['lastName'],
        "email" => $row['email'],
        "departmentID" => $row['departmentID']
    );

    $departmentsData[] = array(
        "id" => $row['departmentID'],
        "name" => $row['department'],
        "locationID" => $row['locationID']
    );

    $locationsData[] = array(
        "id" => $row['locationID'],
        "name" => $row['location']
    );
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data']['personnel'] = $personnelData;
$output['data']['departments'] = $departmentsData;
$output['data']['locations'] = $locationsData;

mysqli_close($conn);

echo json_encode($output);

    
?>
