<?php


require_once 'config.php';
$search_term = $_REQUEST['country'];; 
$search_query = urlencode($search_term);
$url = "https://pixabay.com/api/?key=$imagesApiKey&q=$search_query&image_type=photo";



$ch = curl_init();


curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


$response = curl_exec($ch);


if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    echo "Error: " . $error_msg;
}


curl_close($ch);


$data = json_decode($response, true);


echo json_encode($data);
