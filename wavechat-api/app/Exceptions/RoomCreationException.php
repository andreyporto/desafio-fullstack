<?php

namespace App\Exceptions;

use Exception;

class RoomCreationException extends Exception
{
    public function __construct()
    {
        parent::__construct('Erro ao criar sala, tente novamente');
    }
}
