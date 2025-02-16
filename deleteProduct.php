<?php
include 'db_conn.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['product_id'])) {
    $product_id = $data['product_id'];

    $sql = "DELETE FROM products WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $product_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Successfully Deleted"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Delete failed: " . $conn->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Product ID not provided"]);
}

$conn->close();
?>
