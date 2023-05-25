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

    
    $query = "SELECT personnel.*, department.name AS department, location.name AS location FROM personnel 
              LEFT JOIN department ON personnel.departmentID = department.id
              LEFT JOIN location ON department.locationID = location.id
              WHERE (firstName LIKE ? OR
                     lastName LIKE ? OR
                     email LIKE ?)";

    $searchQuery = "%$searchQuery%";
    $params = array($searchQuery, $searchQuery, $searchQuery);

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

    while ($row = $result->fetch_assoc()) {
        $personnelData[] = $row;
    }

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = $personnelData;

    mysqli_close($conn);

    echo json_encode($output);
?>
