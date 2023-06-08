<?php

include("config.php");


header('Content-Type: application/json; charset=UTF-8');


if (isset($_GET['locationId'])) {
    $locationId = $_GET['locationId'];

    
    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname);

    
    if (mysqli_connect_errno()) {
        $output['status']['code'] = "300";
        $output['status']['name'] = "failure";
        $output['status']['description'] = "database unavailable";
        $output['data'] = [];
        echo json_encode($output);
        exit;
    }

    
    $query = $conn->prepare('SELECT COUNT(id) AS count FROM department WHERE locationID = ?');
    $query->bind_param("i", $locationId);
    $query->execute();
    $result = $query->get_result();

    
    if ($result === false) {
        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "query failed";
        $output['data'] = [];
        echo json_encode($output);
        exit;
    }

    
    $row = $result->fetch_assoc();
    $count = $row['count'];

    
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['data']['count'] = $count;

    
    $conn->close();

    
    echo json_encode($output);
} else {
    
    $output['status']['code'] = "400";
    $output['status']['name'] = "bad request";
    $output['status']['description'] = "locationId parameter is missing";
    $output['data'] = [];
    echo json_encode($output);
}
?>
