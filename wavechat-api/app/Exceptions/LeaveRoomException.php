<?php

namespace App\Exceptions;

use Exception;

class LeaveRoomException extends Exception
{
    public function __construct()
    {
        parent::__construct('Erro ao sair da sala, tente novamente');
    }
}
