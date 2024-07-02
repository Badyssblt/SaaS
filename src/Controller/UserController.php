<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\UserService;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/user/{email}', name: 'app_user')]
    public function index(UserRepository $userRepository, string $email): JsonResponse
    {

        if (!$email) return $this->json(['message' => 'Veuillez spécifier un email'], Response::HTTP_CONFLICT);

        $user = $userRepository->findOneBy(['email' => $email]);

        return $this->json($user, Response::HTTP_OK, [], ["groups" => "item:user"]);
    }

    #[Route('/user', name: "app_user_patch", methods: ["PATCH"])]
    public function editUser(UserService $userService, Request $request, EntityManagerInterface $manager, UserPasswordHasherInterface $hasher)
    {
        $user = $userService->getUser();

        $data = $request->getPayload();

        $email = $data->get('email');
        $password = $data->get('password');

        if ($email && $password) {
            $user->setEmail($email);
            $password = $hasher->hashPassword($user, $password);
            $user->setPassword($password);
        } else if (!$email && $password) {
            $password = $hasher->hashPassword($user, $password);
            $user->setPassword($password);
        } else if ($email && !$password) {
            $user->setEmail($email);
        }

        $manager->persist($user);
        $manager->flush();

        return $this->json($user, Response::HTTP_ACCEPTED, [], ["groups" => ["item:user"]]);
    }
}
