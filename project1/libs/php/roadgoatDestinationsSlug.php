<?php

require_once 'config.php';

$ACCESS_KEY = $roadGoatAccessKey;
$SECRET_KEY = $roadGoatSecretKey;




$city = $_GET['city'];


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.roadgoat.com/api/v2/destinations/auto_complete?q={$city}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Authorization: Basic " . base64_encode("{$ACCESS_KEY}:{$SECRET_KEY}")
));


$response = curl_exec($ch);


curl_close($ch);


$data = json_decode($response, true);


$citySlug = $data['data'][0]['attributes']['slug'];


$output = array(
  'citySlug' => $citySlug,
  'executionTime' => (microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]) * 1000 // execution time in ms
);


header('Content-Type: application/json');
echo json_encode($output);
?>
