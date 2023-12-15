<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

	$conn = mysqli_connect("localhost", "root","");
    $database = mysqli_select_db($conn, "triplej");

    $EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$FlightName=$DecodedData['FlightName'];
	$Destination=$DecodedData['Destination'];
	$Price=$DecodedData['Price'];
	$Date=$DecodedData['Date'];
	
	$query=" INSERT INTO booking (FlightName, Destination, Price, Date) 
			VALUES ('$FlightName', '$Destination', '$Price', '$Date');";
	if($FlightName != null && $Destination != null && $Price != null && $Date != null){
		if(mysqli_query($conn, $query)){
			$response[] = array("Message" => "Your preferences has been booked!\n We will update you if there will be a flight that fits this informations!");
			echo json_encode($response);
		}else{
			$response[] = array("Message" => "Failed to comply your booking!");
			echo json_encode($response);
		}
	}else{
		$response[] = array("Message" => "no data");
		echo json_encode($response);
	}

?>