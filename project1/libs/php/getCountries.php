<?php


$json = file_get_contents('countryBorders.geo.json');


$data = json_decode($json, true);


$results = array();


foreach ($data['features'] as $feature) {
  $countryName = $feature['properties']['name'];
  $iso2Code = $feature['properties']['iso_a2'];
  $iso3Code = $feature['properties']['iso_a3'];
  
  
  $results[] = array(
    'name' => $countryName,
    'iso2_code' => $iso2Code,
    'iso3_code' => $iso3Code
  );
}


header('Content-Type: application/json');
echo json_encode($results);
