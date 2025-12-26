<?php
include_once __DIR__ . '/../../config/cors.php';
include_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

if (!isset($_GET['dog_id'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Hiányzó dog_id"]);
    exit;
}

$dog_id = $_GET['dog_id'];

// Oltások lekérése (dátum szerint csökkenő sorrendben, a legújabb elöl)
$query = "SELECT * FROM vaccinations WHERE dog_id = :dog_id ORDER BY date_administered DESC";
$stmt = $db->prepare($query);
$stmt->bindParam(":dog_id", $dog_id);
$stmt->execute();
$vaccinations = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => [
        "vaccinations" => $vaccinations
        // Később ide jönnek majd: "medical_records" => ...
    ]
]);
?>