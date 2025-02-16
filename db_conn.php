<?php

$servername = 'localhost';
$username = 'root';
$password = "";
$dbname = 'products';

$conn = new mysqli($servername,$username,$password,$dbname);

if($conn -> connect_error){
    echo "Error" . $conn->connect_error;
}

?>