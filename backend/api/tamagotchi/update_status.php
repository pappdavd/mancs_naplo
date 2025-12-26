<?php
include_once __DIR__ . '/../../config/cors.php';
include_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->user_id) && 
    isset($data->hunger) && 
    isset($data->energy) && 
    isset($data->happiness) &&
    isset($data->xp) &&
    isset($data->level)
) {
    $query = "UPDATE tamagotchi_stats 
              SET hunger = :hunger, 
                  energy = :energy, 
                  happiness = :happiness, 
                  xp = :xp, 
                  level = :level,
                  last_updated = NOW() 
              WHERE user_id = :user_id";

    $stmt = $db->prepare($query);

    $stmt->bindParam(":hunger", $data->hunger);
    $stmt->bindParam(":energy", $data->energy);
    $stmt->bindParam(":happiness", $data->happiness);
    $stmt->bindParam(":xp", $data->xp);
    $stmt->bindParam(":level", $data->level);
    $stmt->bindParam(":user_id", $data->user_id);

    if ($stmt->execute()) {
        // Ha még nincs rekord (ritka, de lehet), akkor insertálni kéne, 
        // de a get_status.php már megoldja az inicializálást.
        if ($stmt->rowCount() == 0) {
             // Opcionális: itt lehetne INSERT logikát írni, ha nagyon precízek vagyunk,
             // de a Dashboard először mindig a get_status-t hívja, így ez nem kritikus.
        }
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Állapot frissítve."]);
    } else {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Adatbázis hiba."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Hiányzó adatok."]);
}
?>