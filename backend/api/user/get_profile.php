<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Az user ID-t a query paraméterből vagy a tokenből kéne venni.
// Most egyszerűsítve GET paraméterként várjuk: ?id=1
$user_id = isset($_GET['id']) ? $_GET['id'] : die();

try {
    // 1. User adatok lekérése (Jelszó nélkül!)
    $query = "SELECT id, gazdi_nev, email, role, avatar_url, created_at FROM users WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $user_id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        throw new Exception("Felhasználó nem található.");
    }

    // 2. Kutyák lekérése
    $dogQuery = "SELECT * FROM dogs WHERE user_id = :user_id";
    $stmt = $db->prepare($dogQuery);
    $stmt->bindParam(":user_id", $user_id);
    $stmt->execute();
    $dogs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "user" => $user,
        "dogs" => $dogs
    ]);

} catch (Exception $e) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>