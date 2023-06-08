<?php
	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname);

	if (mysqli_connect_errno()) {
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;
	}	

	$locationQuery = 'SELECT id, name FROM location';
	$locationResult = $conn->query($locationQuery);
	$locations = [];
	while ($locationRow = mysqli_fetch_assoc($locationResult)) {
		array_push($locations, $locationRow);
	}

	$departmentQuery = 'SELECT id, name, locationID FROM department';
	$departmentResult = $conn->query($departmentQuery);
	$departments = [];
	while ($departmentRow = mysqli_fetch_assoc($departmentResult)) {
		array_push($departments, $departmentRow);
	}

	$personnelQuery = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
	FROM personnel p 
	LEFT JOIN department d ON (d.id = p.departmentID) 
	LEFT JOIN location l ON (l.id = d.locationID) 
	ORDER BY p.id, p.lastName, p.firstName, d.name, l.name';

	$personnelResult = $conn->query($personnelQuery);
	$personnelData = [];
	while ($personnelRow = mysqli_fetch_assoc($personnelResult)) {
		array_push($personnelData, $personnelRow);
	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['departments'] = $departments;
	$output['data']['locations'] = $locations;
	$output['data']['personnel'] = $personnelData;
	
	mysqli_close($conn);

	echo json_encode($output); 
?>
