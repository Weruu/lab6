<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
if (!$raw) {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
    exit;
}

$data = json_decode($raw, true);
if ($data === null) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

if (!isset($data['menu']) || !is_array($data['menu'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid structure: missing "menu" array']);
    exit;
}

$file = __DIR__ . DIRECTORY_SEPARATOR . 'menu_data.json';
if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to write data']);
}

?>