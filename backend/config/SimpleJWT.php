<?php
class SimpleJWT {

    // Token generálása (Encode)
    public static function encode($payload, $secret) {
        // Header
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        
        // Base64Url Encode
        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode(json_encode($payload));
        
        // Aláírás készítése
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = self::base64UrlEncode($signature);
        
        // Összefűzés
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    // Segédfüggvény: Base64 URL Safe kódolás (szabványos)
    private static function base64UrlEncode($data) {
        return str_replace(
            ['+', '/', '='], 
            ['-', '_', ''], 
            base64_encode($data)
        );
    }
}
?>