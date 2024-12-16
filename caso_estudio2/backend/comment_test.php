<?php
require 'comment.php';

$idCom = crearComentario(1,'Primer comentario');
if($idTarea){
    echo 'Comentario creado exitosamente ' . $idCom;
}else{
    echo 'No se creo el comentario';
}
