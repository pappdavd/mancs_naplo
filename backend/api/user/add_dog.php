<?php
include_once __DIR__ . '/../../config/cors.php';
include_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

// Ellenőrizzük a kötelezőket (user_id és név)
if (
    !empty($data->user_id) && 
    !empty($data->name)
) {
    // A Bővített SQL Lekérdezés
    $query = "INSERT INTO dogs 
              (user_id, name, nickname, breed, is_mix, mix_details, gender, 
               birth_date, color, coat_type, is_neutered, neutered_date, 
               microchip_number, passport_number, weight, height, notes) 
              VALUES 
              (:user_id, :name, :nickname, :breed, :is_mix, :mix_details, :gender, 
               :birth_date, :color, :coat_type, :is_neutered, :neutered_date, 
               :microchip_number, :passport_number, :weight, :height, :notes)";

    $stmt = $db->prepare($query);

    // --- ADATELŐKÉSZÍTÉS ÉS TISZTÍTÁS ---

    // Stringek
    $name = htmlspecialchars(strip_tags($data->name));
    $nickname = !empty($data->nickname) ? htmlspecialchars(strip_tags($data->nickname)) : null;
    $breed = !empty($data->breed) ? htmlspecialchars(strip_tags($data->breed)) : null;
    $mix_details = !empty($data->mix_details) ? htmlspecialchars(strip_tags($data->mix_details)) : null;
    $gender = !empty($data->gender) ? htmlspecialchars(strip_tags($data->gender)) : 'male';
    $color = !empty($data->color) ? htmlspecialchars(strip_tags($data->color)) : null;
    $coat_type = !empty($data->coat_type) ? htmlspecialchars(strip_tags($data->coat_type)) : null;
    $microchip = !empty($data->microchip_number) ? htmlspecialchars(strip_tags($data->microchip_number)) : null;
    $passport = !empty($data->passport_number) ? htmlspecialchars(strip_tags($data->passport_number)) : null;
    $notes = !empty($data->notes) ? htmlspecialchars(strip_tags($data->notes)) : null;

    // Boolean (Igaz/Hamis) konvertálása 1/0-ra MySQL-nek
    $is_mix = !empty($data->is_mix) && $data->is_mix ? 1 : 0;
    $is_neutered = !empty($data->is_neutered) && $data->is_neutered ? 1 : 0;

    // Dátumok (Ha üres string jön, NULL legyen, különben SQL hiba lehet)
    $birth_date = !empty($data->birth_date) ? $data->birth_date : null;
    $neutered_date = !empty($data->neutered_date) ? $data->neutered_date : null;

    // Számok (Súly, Magasság) - szintén NULL ha üres
    $weight = !empty($data->weight) ? $data->weight : null;
    $height = !empty($data->height) ? $data->height : null;

    // --- PARAMÉTEREK KÖTÉSE ---
    $stmt->bindParam(":user_id", $data->user_id);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":nickname", $nickname);
    $stmt->bindParam(":breed", $breed);
    $stmt->bindParam(":is_mix", $is_mix);
    $stmt->bindParam(":mix_details", $mix_details);
    $stmt->bindParam(":gender", $gender);
    $stmt->bindParam(":birth_date", $birth_date);
    $stmt->bindParam(":color", $color);
    $stmt->bindParam(":coat_type", $coat_type);
    $stmt->bindParam(":is_neutered", $is_neutered);
    $stmt->bindParam(":neutered_date", $neutered_date);
    $stmt->bindParam(":microchip_number", $microchip);
    $stmt->bindParam(":passport_number", $passport);
    $stmt->bindParam(":weight", $weight);
    $stmt->bindParam(":height", $height);
    $stmt->bindParam(":notes", $notes);

    // --- VÉGREHAJTÁS ---
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Kutyus sikeresen hozzáadva a teljes adatlappal!"]);
    } else {
        http_response_code(503);
        // Hiba esetén kiírjuk a részleteket (fejlesztés alatt hasznos)
        echo json_encode(["success" => false, "message" => "Adatbázis hiba.", "error" => $stmt->errorInfo()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "A név megadása kötelező."]);
}
?>