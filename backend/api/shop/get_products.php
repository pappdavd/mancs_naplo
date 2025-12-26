<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    // Lekérjük az összes terméket, a legújabb elöl
    $query = "SELECT * FROM products ORDER BY is_featured DESC, created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "products" => $products
    ]);

} catch (Exception $e) {
    http_response_code(503);
    echo json_encode(["success" => false, "message" => "Hiba a termékek betöltésekor."]);
}
?>