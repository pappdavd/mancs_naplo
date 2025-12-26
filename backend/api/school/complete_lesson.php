<?php
// backend/api/school/complete_lesson.php
include_once '../../config/cors.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id) && !empty($data->lesson_id)) {
    try {
        // Ellenőrizzük, nincs-e már kész (ne kapjon 2x XP-t)
        $checkQuery = "SELECT id FROM user_lessons WHERE user_id = :uid AND lesson_id = :lid";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(":uid", $data->user_id);
        $checkStmt->bindParam(":lid", $data->lesson_id);
        $checkStmt->execute();

        if ($checkStmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Már teljesítve volt."]);
            exit;
        }

        // Beszúrás
        $query = "INSERT INTO user_lessons (user_id, lesson_id) VALUES (:uid, :lid)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":uid", $data->user_id);
        $stmt->bindParam(":lid", $data->lesson_id);

        if ($stmt->execute()) {
            // Itt akár növelhetnénk a user XP-jét is a users táblában, ha lenne xp mezőnk
            echo json_encode(["success" => true, "message" => "Lecke teljesítve! Szép munka!"]);
        } else {
            throw new Exception("Hiba a mentéskor.");
        }

    } catch (Exception $e) {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Hiányzó adatok."]);
}
?>