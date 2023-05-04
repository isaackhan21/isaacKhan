<?php
$baseCurrency = $_REQUEST['currency'];
require_once 'config.php';  



$url = "https://openexchangerates.org/api/latest.json?app_id={$exchangeRatesApiKey}&base={$baseCurrency}";


$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($curl);

if ($response === false) {
    echo 'cURL error: ' . curl_error($curl);
} else {
    echo $response;
}

curl_close($curl);


 ?>
