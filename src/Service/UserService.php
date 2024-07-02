<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;

class UserService
{
    private UserRepository $userRepository;
    private TokenValidator $tokenValidator;

    public function __construct(UserRepository $userRepository, TokenValidator $tokenValidator)
    {
        $this->userRepository = $userRepository;
        $this->tokenValidator = $tokenValidator;
    }

    /**
     * Retourne l'entity User de l'utilisateur connecté
     * 
     * @return User
     * @throws Exception 
     */
    public function getUser(): User
    {
        $email = $this->tokenValidator->getToken()['username'];
        $user = $this->userRepository->findOneBy(['email' => $email]);

        return $user;
    }
}
