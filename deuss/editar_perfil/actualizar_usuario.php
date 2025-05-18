<?php
header('Content-Type: application/json');
require_once("../../conexion/conexion.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
echo json_encode(["error" => "Método no permitido"]);
exit;
}

$correo = $_POST['correo'] ?? '';
$nombre = $_POST['nombre'] ?? '';
$direccion = $_POST['direccion'] ?? '';
$telefono = $_POST['telefono'] ?? '';

if (!$correo || !$nombre) {
echo json_encode(["error" => "Nombre y correo son obligatorios"]);
exit;
}

$stmt = $conn->prepare("UPDATE usuarios SET nombre = ?, direccion = ?, telefono = ? WHERE correo = ?");
$stmt->bind_param("ssss", $nombre, $direccion, $telefono, $correo);

if ($stmt->execute()) {
echo json_encode(["mensaje" => "Perfil actualizado correctamente"]);
} else {
echo json_encode(["error" => "Error al actualizar"]);
}

$stmt->close();
$conn->close();
?>
