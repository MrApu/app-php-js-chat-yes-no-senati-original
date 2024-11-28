<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$metodo = $_SERVER['REQUEST_METHOD'];

$respuesta = [];
switch ($metodo) {
    case 'GET':
        $respuesta = [
            'mensaje' => 'Método GET ejecutado correctamente',
            'data' => $_GET
        ];
        break;

    case 'POST':
        $data_entrante = json_decode(file_get_contents("php://input"), true);
        $respuesta = [
            'mensaje' => 'Método POST ejecutado correctamente',
            'data' => $data_entrante,
        ];
        break;

    case 'PUT':
        $data_entrante = json_decode(file_get_contents("php://input"), true);
        $respuesta = [
            'mensaje' => 'Método PUT ejecutado correctamente',
            'data' => $data_entrante,
        ];
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null; // Obtener el ID del recurso a eliminar
        if ($id) {
            $respuesta = [
                'mensaje' => 'Método DELETE ejecutado correctamente',
                'id_eliminado' => $id,
            ];
        } else {
            $respuesta = [
                'error' => 'ID no proporcionado para eliminar',
            ];
        }
        break;

    default:
        http_response_code(405);
        $respuesta = [
            'error' => 'Método no soportado',
        ];
        break;
}

echo json_encode($respuesta);