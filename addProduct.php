<?php

include 'db_conn.php';

if($_SERVER ['REQUEST_METHOD'] == 'POST'){
    $productName = $_POST ['productName'];
    $productDescription = $_POST ['productDescription'];
    $productPrice = $_POST ['productPrice'];
    $productSold = $_POST ['productSold'];
    $productImgUrl = $_POST ['productImgUrl'];
    $productStock = $_POST ['productStock'];

    $sql = "INSERT INTO products (product_name, product_description,product_price,product_sold,product_imgUrl,
    product_stock) VALUES (?,?,?,?,?,?)";
    $stm = $conn->prepare($sql);
    $stm ->bind_param("ssdisi",$productName,$productDescription,$productPrice
    ,$productSold,$productImgUrl,$productStock);

    if($stm->execute()){
        echo "Successfull Added";
    }else{
        echo "Error" . $conn->error;
    }
    $conn->close();
    $stm->close();

}
?>