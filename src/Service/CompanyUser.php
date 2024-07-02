<?php

namespace App\Service;

use App\Entity\Company;
use App\Entity\Employees;
use App\Repository\UserRepository;
use App\Repository\CompanyRepository;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class CompanyUser
{

    private TokenValidator $tokenValidator;
    private CompanyRepository $companyRepository;
    private UserRepository $userRepository;

    public function __construct(TokenValidator $tokenValidator, CompanyRepository $companyRepository, UserRepository $userRepository)
    {
        $this->tokenValidator = $tokenValidator;
        $this->companyRepository = $companyRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * Récupère les company de l'utilisateur connecté
     * 
     * @return array
     */
    public function getCompany(): array
    {
        $email = $this->tokenValidator->getToken()['username'];
        $user = $this->userRepository->findOneBy(['email' => $email]);
        $company = $this->companyRepository->findBy(['owner' => $user]);

        return $company;
    }

    /**
     * Vérifie si un employé est bien dans une company de l'utilisateur connecté
     * 
     * @return array
     */
    public function checkEmployee(Employees $employee): bool
    {
        $companies = $this->getCompany();

        if (empty($companies)) {
            throw new AuthenticationException('Aucune company');
        }

        foreach ($companies as $company) {
            if ($employee->getCompany() === $company) {
                return true;
            }
        }

        return false;
    }
}
