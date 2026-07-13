<?php

namespace App\Exceptions;

use Exception;

class UserRegistrationException extends Exception
{
    public function __construct()
    {
        parent::__construct('Erro ao registrar usuário, tente novamente');
    }
}
