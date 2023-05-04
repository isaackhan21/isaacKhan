<?php
$countryCode = $_REQUEST['countryCode']; 
require_once 'config.php';

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://holidayapi.com/v1/holidays?pretty&key=$holidayApiKey&country=$countryCode&year=2023",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  header('Content-Type: application/json');
  echo $response;
}
?>
