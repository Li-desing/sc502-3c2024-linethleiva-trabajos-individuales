<?php
//Arreglo transacciones
$transacciones = [ 
    ["id" => 1, "descripcion" => "Transaccion 1", "monto" => 25.7],
    ["id" => 2, "descripcion" => "Transaccion 2", "monto" => 45.6],
];

//Funcion para registrar transaccion 

function agregarTransaccion(&$transacciones,$id, $descripcion, $monto) {
    global $transacciones;
    $transaccion = [
        'id' => $id,
        'descripcion' => $descripcion,
        'monto' => $monto
    ];

    $transacciones[] = $transaccion;

    echo "Transacción agregada: \n";
    print_r($transaccion);
}


agregarTransaccion($transacciones, 3, "Transaccion 3", 67.0);
agregarTransaccion($transacciones, 4, "Transaccion 4", 56.9);

// Mostrar todas las transacciones
echo "Todas las transacciones:";
print_r($transacciones);

//Funcion generar estado de cuenta 

function generarEstadoCuenta($transacciones){
    $montoTotal = 0; //variable que contiene la suma de las transacciones

    //Suma las transacciones y se guardan en montoTotal
    foreach ($transacciones as $transaccion) { 
        $montoTotal += $transaccion["monto"];
    }

    //Cashback del 0.1% del monto total (antes de aplicar el interés).
    $cash = $montoTotal * (0.1 / 100);

    //Monto total con el interes 2.6%
    $montoIntereses = $montoTotal * (1 + 2.6 / 100);
    
    //Guarda los datos recorridos
    foreach ($transacciones as $transaccion) {
        echo "Descripcion: " .$transaccion['descripcion'];
        echo PHP_EOL;
        echo "Monto: " .$transaccion['monto'];
        echo PHP_EOL;
    }
    
    echo "Monto total de transacciones " .($montoTotal);
    echo PHP_EOL;
    echo "Monto total con intereses (2.6%) ". ($montoIntereses);
    echo PHP_EOL;
    echo "Cashback (0.1%) " . ($cash);
    echo PHP_EOL;
    echo "Monto final a pagar (con cashback) ". ($montoIntereses - $cash);
}

generarEstadoCuenta($transacciones);
