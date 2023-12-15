<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

    $conn = mysqli_connect("localhost", "root", "");
    $database = mysqli_select_db($conn, "triplej");

    if (isset($_GET['FlightName'])) {
        // Retrieve book by id
        $id = $_GET['FlightName'];
        // $query = "SELECT a.Account_Id, b.FlightName, b.Destination, b.Price, b.Date FROM accounts a inner join booking b on a.Account_Id = b.Account_Id WHERE Account_Id = '$id'";
        $query ="SELECT * FROM booking WHERE FlightName = '$id'";
    } 
    else{
        // Retrieve all books
        $query = "SELECT * FROM booking";
    }

    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        $booking = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $booking[] = $row;
        }
        echo json_encode($booking);
    } else {
        $response[] = array("Message" => "No booking/s found");
        echo json_encode($response);
    }
?>