<?php
session_start();
$host = 'localhost';
$db = 'ether_site';
$user = 'root';
$pass = 'senha_do_seu_banco';

$conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);

// Recebe os dados via POST
$email = $_POST['email'];
$senha = $_POST['senha'];

$stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($senha, $user['senha'])) {
    $_SESSION['usuario'] = $user['email'];
    echo json_encode(['status' => 'ok']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Login inválido']);
}
?>
