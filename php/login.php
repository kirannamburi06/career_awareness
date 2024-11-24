<?php
// Database connection
$host = 'localhost';
$dbname = 'careerawaranessuserinfo';
$username = 'root'; // Replace with your DB username
$password = ''; // Replace with your DB password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $inputEmail = $_POST['email']; // Using email as the username
        $inputPassword = $_POST['password'];

        // Query to fetch the user with the given email
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$inputEmail]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Verify password
            if (password_verify($inputPassword, $user['password'])) {
                echo "success";  // Credentials are correct
            } else {
                echo "error: Invalid password";  // Invalid password
            }
        } else {
            echo "error: Invalid email";  // Invalid email
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
