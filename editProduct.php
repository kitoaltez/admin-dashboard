<?php
include 'db_conn.php';

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productId = isset($_POST["productId"]) ? intval($_POST["productId"]) : null;
    $productName = isset($_POST["productName"]) ? trim($_POST["productName"]) : '';
    $productDescription = isset($_POST["productDescription"]) ? trim($_POST["productDescription"]) : '';
    $productPrice = isset($_POST["productPrice"]) ? floatval($_POST["productPrice"]) : 0;
    $productSold = isset($_POST["productSold"]) ? intval($_POST["productSold"]) : 0;
    $productImgUrl = isset($_POST["productImgUrl"]) ? trim($_POST["productImgUrl"]) : '';
    $productStock = isset($_POST["productStock"]) ? intval($_POST["productStock"]) : 0;

    if (!$productId) {
        echo json_encode(["status" => "error", "message" => "Invalid Product ID"]);
        exit();
    }

    $sql = "UPDATE products SET 
                product_name=?, 
                product_description=?, 
                product_price=?, 
                product_sold=?, 
                product_imgUrl=?, 
                product_stock=? 
            WHERE product_id=?";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "SQL Error: " . $conn->error]);
        exit();
    }


    $stmt->bind_param("ssdisii", $productName, $productDescription, $productPrice, $productSold, $productImgUrl, $productStock, $productId);


    if ($stmt->execute()) {
        echo "Succesfull Updated";
    } else {
        echo "Error" . $conn->connect_error;
    }

    $stmt->close();
    $conn->close();
}
?>
