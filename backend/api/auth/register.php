<?php
// 1. Konfigurációk behúzása
include_once __DIR__ . '/../../config/cors.php';
include_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

// Ellenőrizzük, hogy minden adat megvan-e
if (
    !empty($data->gazdi_nev) && 
    !empty($data->email) && 
    !empty($data->password)
) {
    // 1. Ellenőrizzük, hogy létezik-e már az email
    $checkQuery = "SELECT id FROM users WHERE email = :email LIMIT 1";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(":email", $data->email);
    $checkStmt->execute();

    if ($checkStmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        echo json_encode(["success" => false, "message" => "Ez az email cím már foglalt."]);
        exit;
    }

    // 2. Felhasználó létrehozása
    $query = "INSERT INTO users (gazdi_nev, email, password, role, created_at) VALUES (:nev, :email, :password, 'user', NOW())";
    $stmt = $db->prepare($query);

    // Adatok tisztítása és JELSZÓ TITKOSÍTÁS (Hash)
    $nev = htmlspecialchars(strip_tags($data->gazdi_nev));
    $email = htmlspecialchars(strip_tags($data->email));
    $password_hash = password_hash($data->password, PASSWORD_BCRYPT); // <--- A LÉNYEG!

    $stmt->bindParam(":nev", $nev);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $password_hash);

    if ($stmt->execute()) {
        // Opcionális: Azonnal létrehozhatjuk a Tamagotchi táblát is, de a get_status.php már kezeli ezt.
        
        http_response_code(201); // Created
        echo json_encode(["success" => true, "message" => "Sikeres regisztráció! Jelentkezz be."]);
    } else {
        http_response_code(503); // Service Unavailable
        echo json_encode(["success" => false, "message" => "Nem sikerült létrehozni a felhasználót."]);
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "message" => "Hiányzó adatok."]);
}
?>