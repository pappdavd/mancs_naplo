<?php
// backend/api/school/get_lessons.php
include_once '../../config/cors.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die();

try {
    // Balra összekapcsoljuk (LEFT JOIN) a leckéket a user_lessons táblával
    // Így látjuk, melyik lecke van kész az adott usernek
    $query = "
        SELECT sl.*, 
               CASE WHEN ul.id IS NOT NULL THEN 1 ELSE 0 END as is_completed
        FROM school_lessons sl
        LEFT JOIN user_lessons ul ON sl.id = ul.lesson_id AND ul.user_id = :user_id
        ORDER BY sl.difficulty, sl.id ASC
    ";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(":user_id", $user_id);
    $stmt->execute();
    
    $lessons = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "lessons" => $lessons]);

} catch (Exception $e) {
    http_response_code(503);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>