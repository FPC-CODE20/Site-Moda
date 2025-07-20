<?php
$host = 'localhost';
$db = 'ether_site';
$user = 'root';
$pass = 'senha_do_seu_banco';

$conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);

$email = $_POST['email'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO usuarios (email, senha) VALUES (?, ?)");
try {
    $stmt->execute([$email, $senha]);
    echo json_encode(['status' => 'ok']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'E-mail já cadastrado']);
}
?>
