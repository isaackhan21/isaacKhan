<?php

$executionStartTime = microtime(true) / 1000;

$data = file_get_contents('countries-codes.json');
$bboxes = json_decode($data, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";

$iso2_codes = array();
foreach ($bboxes as $bbox) {
    $iso2_codes[] = $bbox['iso2_code'];
}

$output['data']['iso2_codes'] = $iso2_codes;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
