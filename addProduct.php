<?php
header("Content-Type: application/json"); 
include 'db_conn.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = ['status' => 'error', 'message' => 'Invalid Request Method'];
    echo json_encode($response);
    exit;
}

$productName = $_POST['productName'] ?? '';
$productDescription = $_POST['productDescription'] ?? '';
$productPrice = $_POST['productPrice'] ?? 0;
$productSold = $_POST['productSold'] ?? 0;
$productImgUrl = $_POST['productImgUrl'] ?? '';
$productStock = $_POST['productStock'] ?? 0;

if (!$productName || !$productDescription || !$productPrice) {
    $response = ['status' => 'error', 'message' => 'Missing required fields'];
    echo json_encode($response);
    exit;
}

$sql = "INSERT INTO products (product_name, product_description, product_price, product_sold, product_imgUrl, product_stock) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stm = $conn->prepare($sql);

if ($stm) {
    $stm->bind_param("ssdisi", $productName, $productDescription, $productPrice, $productSold, $productImgUrl, $productStock);
    $response = $stm->execute()
        ? ['status' => 'success', 'message' => 'Product Added Successfully!']
        : ['status' => 'error', 'message' => "Database Error: " . $conn->error];
    echo json_encode($response);
    $stm->close();
} else {
    $response = ['status' => 'error', 'message' => "SQL Error: " . $conn->error];
    echo json_encode($response);
}

$conn->close();
?>
