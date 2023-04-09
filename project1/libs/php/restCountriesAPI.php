<?php


$countryCode = $_REQUEST['countryCode'];


$url = "https://restcountries.com/v2/alpha/${countryCode}?fullText=true";


$ch = curl_init();


curl_setopt($ch, CURLOPT_URL, $url); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 


$response = curl_exec($ch);


if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
    exit;
}


curl_close($ch);


echo $response;

?>
