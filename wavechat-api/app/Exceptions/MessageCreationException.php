<?php

namespace App\Exceptions;

use Exception;

class MessageCreationException extends Exception
{
    public function __construct()
    {
        parent::__construct('Erro ao enviar mensagem, tente novamente');
    }
}
