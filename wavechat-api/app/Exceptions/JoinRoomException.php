<?php

namespace App\Exceptions;

use Exception;

class JoinRoomException extends Exception
{
    public function __construct()
    {
        parent::__construct('Erro ao entrar na sala, tente novamente');
    }
}
