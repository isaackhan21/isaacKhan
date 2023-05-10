<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

require_once 'config.php';

$url='http://api.geonames.org/citiesJSON?formatted=true&north=' . $_REQUEST['north'] . '&south=' . $_REQUEST['south'] . '&east=' . $_REQUEST['east'] . '&west=' . $_REQUEST['west'] . '&username=' . $geonamesUserName . '&style=full';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);

$result=curl_exec($ch);

curl_close($ch);

if (stripos($result, 'canceling statement due to statement timeout') !== false) {
    $output['status']['code'] = "500";
    $output['status']['name'] = "Internal Server Error";
    $output['status']['description'] = "RoadGoat Marker Not Found";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = null;
} else {
    $decode = json_decode($result,true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        $output['status']['code'] = "400";
        $output['status']['name'] = "Bad Request";
        $output['status']['description'] = "Invalid JSON format";
        $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
        $output['data'] = null;
    } elseif (!$decode) {
        $output['status']['code'] = "404";
        $output['status']['name'] = "Not Found";
        $output['status']['description'] = "RoadGoat Marker Not Found";
        $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
        $output['data'] = null;
    } else {
        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
        $output['data'] = $decode['geonames'];
    }
}

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);


?>

