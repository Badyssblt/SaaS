<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $manager, SerializerInterface $serializer, UserPasswordHasherInterface $hasher)
    {
        $data = $request->getContent();
        $plainPassword = $request->getPayload()->get('password');

        $user = $serializer->deserialize($data, User::class, 'json');
        $hashedPassword = $hasher->hashPassword($user, $plainPassword);
        $user->setPassword($hashedPassword);

        $manager->persist($user);
        $manager->flush();
        return $this->json(['message' => 'Utilisateur inscrit avec succès', 'user' => $user], Response::HTTP_CREATED);
    }
}
