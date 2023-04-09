<?php

$executionStartTime = microtime(true) / 1000;

$data = file_get_contents('bounding-boxes.json');
$bboxes = json_decode($data, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";

$output['data']['bboxes'] = $bboxes;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
