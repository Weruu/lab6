<?php
header('Content-Type: application/json; charset=utf-8');

$file = __DIR__ . DIRECTORY_SEPARATOR . 'menu_data.json';
if (!file_exists($file)) {
    echo json_encode(['menu' => []]);
    exit;
}

$json = file_get_contents($file);
if ($json === false || $json === '') {
    echo json_encode(['menu' => []]);
    exit;
}

echo $json;
?>