<?php
// Ez tartalmazza a titkos kulcsot, amivel aláírjuk a tokent.
// Nevezd át vagy változtasd meg a kulcsot éles környezetben!
define('JWT_SECRET_KEY', 'SzuperTitkosMancsNaploJelszo_2025'); 
define('JWT_ISSUER', 'http://localhost/pawpatrol');
define('JWT_AUDIENCE', 'http://localhost/pawpatrol');
define('JWT_ALGORITHM', 'HS256');
?>