<?php

$lat = $_REQUEST['lat'];
$lng = $_REQUEST['lng'];

require_once 'config.php';

$url = 'https://api.opencagedata.com/geocode/v1/json?q=' . urlencode($lat . ',' . $lng) . '&key=' . $openCageApiKey . '&language=en&pretty=1';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);

curl_close($ch);

echo $result;
?>
