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

    
    $deletePersonDetailsQuery = $conn->prepare('DELETE FROM personnel WHERE id = ?');
    $deletePersonQuery = $conn->prepare('DELETE FROM department WHERE id = ?');

    
    if ($deletePersonDetailsQuery && $deletePersonQuery) {
        $personId = $_REQUEST['id'];

        
        $deletePersonDetailsQuery->bind_param("i", $personId);
        $deletePersonDetailsQuery->execute();

        
        $deletePersonQuery->bind_param("i", $personId);
        $deletePersonQuery->execute();

        
        if ($deletePersonDetailsQuery && $deletePersonQuery) {
            $output['status']['code'] = "200";
            $output['status']['name'] = "ok";
            $output['status']['description'] = "success";
            $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
            $output['data'] = [];
        } else {
            $output['status']['code'] = "400";
            $output['status']['name'] = "executed";
            $output['status']['description'] = "query failed";  
            $output['data'] = [];
        }
    } else {
        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "query preparation failed";  
        $output['data'] = [];
    }

    mysqli_close($conn);

    echo json_encode($output);

?>
