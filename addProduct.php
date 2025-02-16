<?php
header("Content-Type: application/json"); // Set response type to JSON

include 'db_conn.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productName = $_POST['productName'] ?? '';
    $productDescription = $_POST['productDescription'] ?? '';
    $productPrice = $_POST['productPrice'] ?? 0;
    $productSold = $_POST['productSold'] ?? 0;
    $productImgUrl = $_POST['productImgUrl'] ?? '';
    $productStock = $_POST['productStock'] ?? 0;


    if (empty($productName) || empty($productDescription) || empty($productPrice)) {
        $response['status'] = 'error';
        $response['message'] = 'Missing required fields';
        echo json_encode($response);
        exit;
    }

    $sql = "INSERT INTO products (product_name, product_description, product_price, product_sold, product_imgUrl, product_stock) 
            VALUES (?, ?, ?, ?, ?, ?)";
    
    $stm = $conn->prepare($sql);
    if (!$stm) {
        $response['status'] = 'error';
        $response['message'] = "SQL Prepare Error: " . $conn->error;
        echo json_encode($response);
        exit;
    }

    $stm->bind_param("ssdisi", $productName, $productDescription, $productPrice, $productSold, $productImgUrl, $productStock);

    if ($stm->execute()) {
        $response['status'] = 'success';
        $response['message'] = 'Product Added Successfully!';
    } else {
        $response['status'] = 'error';
        $response['message'] = "Database Error: " . $conn->error;
    }

    $stm->close();
    $conn->close();

    echo json_encode($response); 
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid Request Method';
    echo json_encode($response);
}
?>
