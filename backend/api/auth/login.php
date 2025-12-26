<?php
// 1. CORS és Error Reporting (hogy lássuk a valódi hibát)
// A __DIR__ segít, hogy biztosan jó helyről töltsük be a fájlokat
include_once __DIR__ . '/../../config/cors.php';

// Ha itt hiba van, a CORS fejléc miatt már látni fogjuk a böngészőben!
try {
    include_once __DIR__ . '/../../config/database.php';
    include_once __DIR__ . '/../../config/jwt_config.php';
    include_once __DIR__ . '/../../config/SimpleJWT.php';

    $database = new Database();
    $db = $database->getConnection();

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->password)) {
        
        $query = "SELECT id, gazdi_nev, email, password, role, avatar_url FROM users WHERE email = :email LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":email", $data->email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // JELSZÓ ELLENŐRZÉS
            if (password_verify($data->password, $row['password'])) {
                
                $payload = array(
                    "iss" => JWT_ISSUER,
                    "iat" => time(),
                    "exp" => time() + 3600,
                    "data" => array(
                        "id" => $row['id'],
                        "gazdi_nev" => $row['gazdi_nev'],
                        "email" => $row['email'],
                        "role" => $row['role']
                    )
                );

                // SimpleJWT használata
                $jwt = SimpleJWT::encode($payload, JWT_SECRET_KEY);

                http_response_code(200);
                echo json_encode(array(
                    "success" => true,
                    "message" => "Sikeres bejelentkezés!",
                    "token" => $jwt,
                    "data" => array(
                        "id" => $row['id'],
                        "gazdi_nev" => $row['gazdi_nev'],
                        "email" => $row['email'],
                        "role" => $row['role'],
                        "avatar_url" => $row['avatar_url']
                    )
                ));

            } else {
                http_response_code(401);
                echo json_encode(array("success" => false, "message" => "Hibás jelszó."));
            }
        } else {
            http_response_code(404);
            echo json_encode(array("success" => false, "message" => "Nincs ilyen felhasználó."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Hiányzó adatok."));
    }

} catch (Exception $e) {
    // Ha bármi hiba történik (pl. adatbázis), azt JSON-ben adjuk vissza, ne HTML hibaként
    http_response_code(500);
    echo json_encode(array(
        "success" => false, 
        "message" => "Szerver hiba: " . $e->getMessage()
    ));
}
?>