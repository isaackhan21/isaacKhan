<?php




$url = "https://restcountries.com/v3.1/all";


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
