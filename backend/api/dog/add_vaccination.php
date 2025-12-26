<?php
include_once __DIR__ . '/../../config/cors.php';
include_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->dog_id) && !empty($data->vaccine_name) && !empty($data->date_administered)) {
    
    $query = "INSERT INTO vaccinations (dog_id, vaccine_name, date_administered, valid_until, vet_name, notes) 
              VALUES (:dog_id, :name, :date, :valid, :vet, :notes)";
    
    $stmt = $db->prepare($query);

    // Adatok tisztítása
    $vaccine_name = htmlspecialchars(strip_tags($data->vaccine_name));
    $vet_name = !empty($data->vet_name) ? htmlspecialchars(strip_tags($data->vet_name)) : null;
    $notes = !empty($data->notes) ? htmlspecialchars(strip_tags($data->notes)) : null;
    $valid_until = !empty($data->valid_until) ? $data->valid_until : null;

    $stmt->bindParam(":dog_id", $data->dog_id);
    $stmt->bindParam(":name", $vaccine_name);
    $stmt->bindParam(":date", $data->date_administered);
    $stmt->bindParam(":valid", $valid_until);
    $stmt->bindParam(":vet", $vet_name);
    $stmt->bindParam(":notes", $notes);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Oltás rögzítve!"]);
    } else {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Adatbázis hiba."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Hiányzó adatok (név és dátum kötelező)."]);
}
?>