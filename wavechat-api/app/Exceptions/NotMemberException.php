<?php

namespace App\Exceptions;

use Exception;

class NotMemberException extends Exception
{
    public function __construct()
    {
        parent::__construct('Você não é membro desta sala');
    }
}
