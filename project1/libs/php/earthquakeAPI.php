<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

require_once 'config.php';

$url = 'http://api.geonames.org/earthquakesJSON?formatted=true&north=' . $_REQUEST['north'] . '&south=' . $_REQUEST['south'] . '&east=' . $_REQUEST['east'] . '&west=' . $_REQUEST['west'] . '&username=' . $geonamesUserName . '&style=full';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result, true);

if(empty($decode['earthquakes'])) {
    $output['status']['code'] = "204";
    $output['status']['name'] = "no data";
    $output['status']['description'] = "Earthquake Markers Not Found";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = [];
} else {
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $decode['earthquakes'];
}

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output); 

	

?>
