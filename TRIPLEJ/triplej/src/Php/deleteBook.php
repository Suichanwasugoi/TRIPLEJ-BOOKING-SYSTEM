<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "");
$database = mysqli_select_db($conn, "triplej");

if(isset($_GET['Transac_ID'])){
    $id = $_GET['Transac_ID'];
    $query = "DELETE FROM booking WHERE Transac_ID = '$id'";
    mysqli_query($conn, $query);
    echo json_encode(['success' => true, 'message' => 'Booking has been deleted successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'No Transaction ID provided.']);
}
?>