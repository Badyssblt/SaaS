<?php

namespace App\Service;

use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class TokenValidator
{

    private TokenStorageInterface $storage;
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(TokenStorageInterface $storage, JWTTokenManagerInterface $jwtManager)
    {
        $this->storage = $storage;
        $this->jwtManager = $jwtManager;
    }



    /**
     * Vérifie et retourne le token de l'utilisateur connecté
     * 
     * @param array $arr
     * @return int
     * @throws Exception If element in array is not an integer
     */
    public function getToken(): array
    {
        $token = $this->storage->getToken();

        if ($token === null) {
            throw new AuthenticationException('Token is missing or invalid.');
        }

        $decodedToken = $this->jwtManager->decode($token);

        if ($decodedToken === false) {
            throw new AuthenticationException('Failed to decode token.');
        }

        return $decodedToken;
    }
}
