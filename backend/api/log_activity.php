<?php
// backend/api/log_activity.php
include_once '../config/cors.php';
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id) && !empty($data->activity_type)) {
    try {
        $query = "INSERT INTO activity_logs (user_id, activity_type, details) VALUES (:user_id, :type, :details)";
        $stmt = $db->prepare($query);

        // Adatok tisztítása
        $details = !empty($data->details) ? htmlspecialchars(strip_tags($data->details)) : '';
        
        $stmt->bindParam(":user_id", $data->user_id);
        $stmt->bindParam(":type", $data->activity_type);
        $stmt->bindParam(":details", $details);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Naplózva."]);
        } else {
            throw new Exception("Nem sikerült írni az adatbázisba.");
        }
    } catch (Exception $e) {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Hiányzó adatok (user_id vagy type)."]);
}
?>