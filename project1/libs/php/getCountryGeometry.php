<?php


$countryCode = $_POST['countryCode'];


$json = file_get_contents('countryBorders.geo.json');


$data = json_decode($json, true);


$countryGeometry = null;
foreach ($data['features'] as $feature) {
  if ($feature['properties']['iso_a3'] === $countryCode) {
    $countryGeometry = $feature['geometry'];
    break;
  }
}




header('Content-Type: application/json');
echo json_encode($countryGeometry);
