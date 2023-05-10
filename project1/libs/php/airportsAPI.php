<?php
$countryCode = $_REQUEST['countryCode'];

require_once 'config.php';
$url = "https://airlabs.co/api/v9/airports?country_code=$countryCode&api_key=$airportsApiKey";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($httpCode !== 200) {
    error_log("Error: HTTP status code $httpCode");
    http_response_code($httpCode);
    echo json_encode(array(
        'error' => 'There was an error processing your request'
    ));
    exit();
}

curl_close($ch);

$data = json_decode($response, true);

if ($data === null || !isset($data['response']) || empty($data['response'])) {
    $errorData = array('error' => 'Airport Markers Not Found');
    header('Content-Type: application/json');
    echo json_encode($errorData);
} else {
    header('Content-Type: application/json');
    echo $response;
}
