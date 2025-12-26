<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Ellenőrizzük, hogy POST kérés jött-e, és van-e név + ár
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['name']) && !empty($_POST['price'])) {
    
    try {
        // --- 1. KÉPFELTÖLTÉS KEZELÉSE ---
        $image_url = ""; // Alapértelmezett, ha nincs kép
        
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../../uploads/';
            
            // Egyedi fájlnév generálása (hogy ne írják felül egymást a 'kutya.jpg' nevű fájlok)
            $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $newFileName = uniqid() . '.' . $extension;
            $targetFile = $uploadDir . $newFileName;

            // Fájlmozgatás a temp mappából a végleges helyre
            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                // SIKER! Ez lesz az URL, amit az adatbázisba mentünk
                // FONTOS: Itt a saját localhost elérésedet állítsd be!
                $image_url = "http://localhost/pawpatrol/uploads/" . $newFileName;
            } else {
                throw new Exception("Nem sikerült feltölteni a képet.");
            }
        }

        // --- 2. ADATBÁZIS MENTÉS ---
        $query = "INSERT INTO products (name, description, price, image_url, category, stock, is_featured) 
                  VALUES (:name, :desc, :price, :img, :cat, :stock, :feat)";
        
        $stmt = $db->prepare($query);

        // Adatok a $_POST tömbből
        $name = htmlspecialchars(strip_tags($_POST['name']));
        $desc = htmlspecialchars(strip_tags($_POST['description']));
        $price = htmlspecialchars(strip_tags($_POST['price']));
        $cat = htmlspecialchars(strip_tags($_POST['category']));
        $stock = !empty($_POST['stock']) ? $_POST['stock'] : 10;
        
        // A checkbox stringként jön ("true" vagy "false"), vagy 1/0
        $is_featured_input = $_POST['is_featured'] ?? 'false';
        $feat = ($is_featured_input === 'true' || $is_featured_input === '1') ? 1 : 0;

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":desc", $desc);
        $stmt->bindParam(":price", $price);
        $stmt->bindParam(":img", $image_url);
        $stmt->bindParam(":cat", $cat);
        $stmt->bindParam(":stock", $stock);
        $stmt->bindParam(":feat", $feat);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Termék és kép feltöltve!"]);
        } else {
            throw new Exception("Adatbázis hiba.");
        }

    } catch (Exception $e) {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }

} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Hiányzó adatok (Név és Ár kötelező)."]);
}
?>