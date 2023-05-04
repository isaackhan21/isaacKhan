<?php
$countries_json = file_get_contents('countries.json');
$countries_data = json_decode($countries_json, true);

$countries = [];

foreach ($countries_data['countries']['country'] as $country_data) {
    $countries[] = [
        'countryCode' => $country_data['countryCode'],
        'countryName' => $country_data['countryName'],
        'currencyCode' => $country_data['currencyCode'],
    ];
}

echo json_encode($countries);
?>
