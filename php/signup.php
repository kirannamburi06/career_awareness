<?php
// Database connection
$host = 'localhost';
$dbname = 'careerawaranessuserinfo';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
       

        // Get POST data
        $name = $_POST['name'];
        $email = $_POST['email'];
        $mobile = $_POST['mobile'];
        $whatsapp = $_POST['whatsapp'];
        $dob = $_POST['dob'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash password

        // Prepare SQL statement
        $stmt = $pdo->prepare("INSERT INTO users (name, email, mobile, whatsapp, dob, password) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $mobile, $whatsapp, $dob, $password]);

        echo "success"; // Send success message
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
