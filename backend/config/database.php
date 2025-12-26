<?php
// backend/config/database.php

class Database {
    private $host = "localhost";
    private $db_name = "mancs_naplo";
    private $username = "root"; // Állítsd be a sajátodra
    private $password = "";     // Állítsd be a sajátodra
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8mb4");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            // Hiba esetén naplózunk a logs mappába, nem a képernyőre írjuk ki!
            file_put_contents(__DIR__ . '/../logs/error_log.txt', date('[Y-m-d H:i:s] ') . "Connection error: " . $exception->getMessage() . PHP_EOL, FILE_APPEND);
            echo json_encode(["message" => "Adatbázis hiba."]);
            exit;
        }
        return $this->conn;
    }
}
?>