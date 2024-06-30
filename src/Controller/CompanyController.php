<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\Employees;
use App\Service\TokenValidator;
use App\Repository\CompanyRepository;
use App\Repository\EmployeesRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;

class CompanyController extends AbstractController
{
    #[Route('/companies', name: 'app_company', methods: ["GET"])]
    public function retrievesCompanies(CompanyRepository $companyRepository): Response
    {
        $companies = $companyRepository->findAll();

        return $this->json($companies, Response::HTTP_OK, [], ["groups" => ["collection:company"]]);
    }

    #[Route('/companies/user', name: "app_company_user", methods: ["GET"])]
    public function retrievesUserCompany(TokenValidator $tokenValidator, CompanyRepository $companyRepository, UserRepository $userRepository)
    {
        $email = $tokenValidator->getToken()['username'];

        if (!$email) {
            return $this->json(['Veuillez vous connectez'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $userRepository->findOneBy(['email' => $email]);



        $companies = $companyRepository->findBy(['owner' => $user]);

        return $this->json($companies, Response::HTTP_OK, [], ['groups' => ['item:company']]);
    }


    #[Route('/companies/{id}', name: "app_company_single", methods: ["GET"])]
    public function retrievesCompany(Company $company, Request $request, TokenValidator $tokenValidator)
    {
        $email = $tokenValidator->getToken()['username'];
        if ($company->getOwner()->getEmail() !== $email) {
            return $this->json(["message" => "Vous n'êtes pas autorisé à accéder à cette company"], Response::HTTP_UNAUTHORIZED);
        }
        return $this->json($company, Response::HTTP_OK, [], ["groups" => ['item:company']]);
    }



    #[Route('/companies/{id}', name: "app_company_delete", methods: ["DELETE"])]
    public function deleteCompany(TokenValidator $tokenValidator, Company $company, EntityManagerInterface $manager)
    {
        $email = $tokenValidator->getToken()['username'];
        if ($company->getOwner()->getEmail() !== $email) {
            return $this->json(["message" => "Vous n'êtes pas autorisé à accéder à cette company"], Response::HTTP_UNAUTHORIZED);
        }
        if (!$company) {
            return $this->json(['message' => 'Entreprise introuvable']);
        }

        $manager->remove($company);
        $manager->flush();

        return $this->json([], Response::HTTP_NO_CONTENT);
    }

    #[Route('/companies/{id}', name: 'app_company_edit', methods: ['PATCH'])]
    public function editCompany(SerializerInterface $serializer, Company $company, Request $request, EntityManagerInterface $manager, TokenValidator $tokenValidator)
    {
        $email = $tokenValidator->getToken()['username'];
        if ($company->getOwner()->getEmail() !== $email) {
            return $this->json(["message" => "Vous n'êtes pas autorisé à accéder à cette company"], Response::HTTP_UNAUTHORIZED);
        }

        $data = $request->getContent();
        $updatedCompany = $serializer->deserialize($data, Company::class, 'json');

        if ($updatedCompany->getName()) {
            $company->setName($updatedCompany->getName());
        }

        $manager->persist($company);
        $manager->flush();

        return $this->json($company, Response::HTTP_OK, [], ["groups" => "item:company"]);
    }

    #[Route('/companies', name: 'app_company_create', methods: ['POST'])]
    public function createCompany(Request $request, SerializerInterface $serializer, EntityManagerInterface $manager, TokenValidator $tokenValidator, UserRepository $userRepository)
    {
        $email = $tokenValidator->getToken()['username'];

        if (!$email) {
            return $this->json(['Veuillez vous connectez'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $userRepository->findOneBy(['email' => $email]);

        $data = $request->getContent();


        $company = $serializer->deserialize($data, Company::class, 'json');

        $company->setOwner($user);

        $manager->persist($company);
        $manager->flush();

        return $this->json($company, Response::HTTP_OK, [], ['groups' => 'item:company']);
    }
}
