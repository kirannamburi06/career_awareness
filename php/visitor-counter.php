<?php
session_start();

// Database connection
$host = 'localhost';
$dbname = 'careerawaranessuserinfo';
$username = 'root'; // Your DB username
$password = ''; // Your DB password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the user has already visited during this session
    if (!isset($_SESSION['visited'])) {
        $_SESSION['visited'] = true;

        // Increment the visitor count in the database
        $stmt = $pdo->prepare("UPDATE visitor_count SET count = count + 1 WHERE id = 1");
        $stmt->execute();
    }

    // Fetch the updated visitor count
    $stmt = $pdo->query("SELECT count FROM visitor_count WHERE id = 1");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        echo $row['count']; // Return the visitor count
    } else {
        echo "0"; // Default value if no record is found
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
