<?php

namespace App\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;

class JWTExceptionListener
{
    /**
     * @param JWTInvalidEvent $event
     */
    public function onJWTInvalid(JWTInvalidEvent $event)
    {
        $data = [
            'status'  => 'error',
            'message' => 'Votre token est invalide, veuillez vous reconnecter.',
        ];

        $response = new JsonResponse($data, JsonResponse::HTTP_UNAUTHORIZED);

        $event->setResponse($response);
    }

    /**
     * @param JWTNotFoundEvent $event
     */
    public function onJWTNotFound(JWTNotFoundEvent $event)
    {
        $data = [
            'status'  => 'error',
            'message' => 'Token non trouvé, veuillez fournir un token.',
        ];

        $response = new JsonResponse($data, JsonResponse::HTTP_UNAUTHORIZED);

        $event->setResponse($response);
    }

    /**
     * @param JWTExpiredEvent $event
     */
    public function onJWTExpired(JWTExpiredEvent $event)
    {
        $data = [
            'status'  => 'error',
            'message' => 'Votre token a expiré, veuillez vous reconnecter.',
        ];

        $response = new JsonResponse($data, JsonResponse::HTTP_UNAUTHORIZED);

        $event->setResponse($response);
    }


    /**
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        $data = [
            'status'  => 'error',
            'message' => 'Email ou mot de passe incorrect...',
        ];

        $response = new JWTAuthenticationFailureResponse($data['message'], JsonResponse::HTTP_UNAUTHORIZED);
        $response->setData($data);

        $event->setResponse($response);
    }
}
