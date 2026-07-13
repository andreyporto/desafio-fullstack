<?php

namespace App\Exceptions;

use Exception;

class AlreadyMemberException extends Exception
{
    public function __construct()
    {
        parent::__construct('Você já é membro desta sala');
    }
}
