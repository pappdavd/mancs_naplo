<?php
include_once __DIR__ . '/../../config/cors.php';
include_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->user_id) && 
    !empty($data->name)
) {
    $query = "INSERT INTO dogs (user_id, name, breed, age) VALUES (:user_id, :name, :breed, :age)";
    $stmt = $db->prepare($query);

    // Adatok tisztítása
    $name = htmlspecialchars(strip_tags($data->name));
    $breed = !empty($data->breed) ? htmlspecialchars(strip_tags($data->breed)) : null;
    $age = !empty($data->age) ? htmlspecialchars(strip_tags($data->age)) : null;

    $stmt->bindParam(":user_id", $data->user_id);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":breed", $breed);
    $stmt->bindParam(":age", $age);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Kutyus sikeresen hozzáadva!"]);
    } else {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Adatbázis hiba."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Hiányzó adatok (név kötelező)."]);
}
?>