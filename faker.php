<?php
require_once 'vendor/autoload.php';

$databasePath = 'C:\Ynov\B2\UX UI Design\TP\database.db';

try {
    $pdo = new PDO("sqlite:$databasePath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
    exit;
}

$faker = Faker\Factory::create();

$nbProduits = 10;

$stmt = $pdo->prepare("INSERT INTO products (name, description, price, image_url) VALUES (:name, :description, :price, :image_url)");

for ($i = 0; $i < $nbProduits; $i++) {
    $name = $faker->word;  // Génère un produit
    $description = (string) $faker->sentence(10);  // Génère une description
    $price = $faker->randomFloat(2, 1, 100);  // Génère un prix
    $image_url = $faker->imageUrl(200, 300, 'technics');  // Génère une URL d'image au hasard

    $stmt->execute([
        ':name' => $name,
        ':description' => $description,
        ':price' => $price,
        ':image_url' => $image_url
    ]);
}

echo "$nbProduits produits ont été ajoutés.";
