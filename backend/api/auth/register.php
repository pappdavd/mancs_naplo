<?php
// backend/api/register.php
include_once '../config/cors.php'; // <--- EZ A FONTOS SOR
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->gazdi_nev) &&
    !empty($data->email) &&
    !empty($data->password)
) {
    // Ellenőrizzük, hogy létezik-e már
    $checkQuery = "SELECT id FROM users WHERE email = :email LIMIT 0,1";
    $stmt = $db->prepare($checkQuery);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Ez az email már foglalt."]);
    } else {
        // Új felhasználó
        $query = "INSERT INTO users (gazdi_nev, email, password, kutya_nev) VALUES (:gazdi_nev, :email, :password, :kutya_nev)";
        $stmt = $db->prepare($query);

        // Adatok tisztítása
        $gazdi_nev = htmlspecialchars(strip_tags($data->gazdi_nev));
        $email = htmlspecialchars(strip_tags($data->email));
        $kutya_nev = htmlspecialchars(strip_tags($data->kutya_nev ?? ''));
        $password_hash = password_hash($data->password, PASSWORD_DEFAULT);

        $stmt->bindParam(":gazdi_nev", $gazdi_nev);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $password_hash);
        $stmt->bindParam(":kutya_nev", $kutya_nev);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Sikeres regisztráció."]);
        } else {
            http_response_code(503); // Service Unavailable
            echo json_encode(["success" => false, "message" => "Nem sikerült létrehozni a felhasználót."]);
        }
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "message" => "Hiányos adatok."]);
}
?>