<?php
// backend/config/cors.php

// Engedélyezzük a React fejlesztői szervert (vagy * mindenkit)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Ha a böngésző "OPTIONS" kérést küld (ellenőrzés), azonnal válaszolunk OK-val
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>