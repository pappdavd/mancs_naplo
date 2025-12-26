<?php
// backend/api/login.php
include_once '../config/cors.php';
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $query = "SELECT id, gazdi_nev, password, kutya_nev FROM users WHERE email = :email LIMIT 0,1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Jelszó ellenőrzés
        if (password_verify($data->password, $row['password'])) {
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Sikeres belépés.",
                "user" => [
                    "id" => $row['id'],
                    "gazdi_nev" => $row['gazdi_nev'],
                    "kutya_nev" => $row['kutya_nev']
                ]
            ]);
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(["success" => false, "message" => "Hibás jelszó."]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Nincs ilyen felhasználó."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Add meg az emailt és a jelszót."]);
}
?>