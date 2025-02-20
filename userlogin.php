<?php
session_start();
include 'db_conn.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = isset($_POST['username']) ? trim($_POST['username']) : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;
    $role = isset($_POST['role']) ? $_POST['role'] : null;

    if (!$username || !$password || !$role || $role == "Select Role") {
        header("Location: userlogin.html?error=⚠️ Please fill in all fields correctly!");
        exit();
    }


    $query = "SELECT employee_id, username, password, role FROM employee WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            if ($role === $user['role']) {
                $_SESSION['user_id'] = $user['employee_id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['role'];

                if ($user['role'] === 'Admin') {
                    echo "<script>alert('Login Successfully'); window.location.href='dashboard.html';</script>";
                    exit();
                } elseif ($user['role'] === 'product_manager') {
                    echo "<script>alert('Login Successfully'); window.location.href='product_management.php';</script>";
                    exit();
                } elseif ($user['role'] === 'order_manager') {
                    echo "<script>alert('Login Successfully'); window.location.href='order_management.php';</script>";
                    exit();
                }
            } else {
                header("Location: userlogin.html?error= Selected role does not match our records!");
                exit();
            }
        } else {
            header("Location: userlogin.html?error= Incorrect password!");
            exit();
        }
    } else {
        header("Location: userlogin.html?error= Invalid username!");
        exit();
    }
}
?>
