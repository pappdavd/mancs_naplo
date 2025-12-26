<?php
// FONTOS: Az útvonalak a config mappához
include_once __DIR__ . '/../../config/cors.php';
include_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

if (!isset($_GET['user_id'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Nincs user ID megadva."]);
    exit;
}

$user_id = $_GET['user_id'];

// Lekérdezzük az adatokat
$query = "SELECT * FROM tamagotchi_stats WHERE user_id = :user_id LIMIT 1";
$stmt = $db->prepare($query);
$stmt->bindParam(":user_id", $user_id);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    // Ha van már mentett állapota
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Integerré konvertálás, hogy a React szeresse
    $data = [
        "hunger" => (int)$row['hunger'],
        "energy" => (int)$row['energy'],
        "happiness" => (int)$row['happiness'],
        "xp" => (int)$row['xp'],
        "level" => (int)$row['level']
    ];

    http_response_code(200);
    echo json_encode(["success" => true, "data" => $data]);
} else {
    // Ha MÉG NINCS adata (most regisztrált), hozzunk létre egyet!
    $insertQuery = "INSERT INTO tamagotchi_stats (user_id, hunger, energy, happiness, xp, level) VALUES (:uid, 100, 100, 100, 0, 1)";
    $insertStmt = $db->prepare($insertQuery);
    $insertStmt->bindParam(":uid", $user_id);
    
    if($insertStmt->execute()) {
        echo json_encode([
            "success" => true, 
            "data" => [
                "hunger" => 100,
                "energy" => 100,
                "happiness" => 100,
                "xp" => 0,
                "level" => 1
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Hiba az inicializáláskor."]);
    }
}
?>