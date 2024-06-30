<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\Employees;
use App\Service\TokenValidator;
use App\Repository\EmployeesRepository;
use App\Service\CompanyUser;
use App\Service\PdfGenerator;
use App\Service\PdfGeneratorService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EmployeeController extends AbstractController
{
    #[Route('/companies/{id}/employee', name: "app_company_add_employee", methods: ['POST'])]
    public function addEmployee(SerializerInterface $serializer, Request $request, Company $company, EntityManagerInterface $manager, TokenValidator $tokenValidator, EmployeesRepository $employeesRepository)
    {
        $email = $tokenValidator->getToken()['username'];
        if ($company->getOwner()->getEmail() !== $email) {
            return $this->json(["message" => "Vous n'êtes pas autorisé à accéder à cette company"], Response::HTTP_UNAUTHORIZED);
        }

        $data = $request->getContent();

        $employee = $serializer->deserialize($data, Employees::class, 'json');

        $company->addEmployee($employee);
        $manager->persist($company);
        $manager->flush();

        return $this->json($company, Response::HTTP_OK, [], ['groups' => 'item:company']);
    }



    #[Route('/companies/{id}/employee/{employeeId}', name: "app_company_edit_employee", methods: ['PATCH'])]
    public function editEmployee(int $employeeId, SerializerInterface $serializer, Request $request, Company $company, EntityManagerInterface $manager, TokenValidator $tokenValidator, EmployeesRepository $employeesRepository)
    {
        $email = $tokenValidator->getToken()['username'];
        if ($company->getOwner()->getEmail() !== $email) {
            return $this->json(["message" => "Vous n'êtes pas autorisé à accéder à cette company"], Response::HTTP_UNAUTHORIZED);
        }


        $employee = $employeesRepository->find($employeeId);
        if (!$employee) {
            return $this->json(["message" => "Employee non trouvé"], Response::HTTP_NOT_FOUND);
        }

        $data = $request->getContent();
        $updatedEmployee = $serializer->deserialize($data, Employees::class, 'json');

        if ($updatedEmployee->getFirstName()) {
            $employee->setFirstName($updatedEmployee->getFirstName());
        }
        if ($updatedEmployee->getLastName()) {
            $employee->setLastName($updatedEmployee->getLastName());
        }
        if ($updatedEmployee->getBirthAt()) {
            $employee->setBirthAt(new \DateTime($updatedEmployee->getBirth()));
        }
        if ($updatedEmployee->getEmail()) {
            $employee->setEmail($updatedEmployee->getEmail());
        }
        if ($updatedEmployee->getPhoneNumber()) {
            $employee->setPhoneNumber($updatedEmployee->getPhoneNumber());
        }
        if ($updatedEmployee->getAddress()) {
            $employee->setAddress($updatedEmployee->getAddress());
        }
        if ($updatedEmployee->getHiredAt()) {
            $employee->setHiredAt(new \DateTime($updatedEmployee->getHired()));
        }
        if ($updatedEmployee->getJobTitle()) {
            $employee->setJobTitle($updatedEmployee->getJob());
        }
        if ($updatedEmployee->getSalary()) {
            $employee->setSalary($updatedEmployee->getSalary());
        }
        if ($updatedEmployee->getStatus()) {
            $employee->setStatus($updatedEmployee->getStatus());
        }

        $manager->persist($employee);
        $manager->flush();

        return $this->json($company, Response::HTTP_OK, [], ['groups' => 'item:company']);
    }

    #[Route("/companies/{id}/employee/{employeeId}", name: "app_company_fire_employee", methods: ["DELETE"])]
    public function fireEmployee(EntityManagerInterface $manager, TokenValidator $tokenValidator, Company $company, EmployeesRepository $employeesRepository, int $employeeId)
    {
        $email = $tokenValidator->getToken()['username'];
        if ($company->getOwner()->getEmail() !== $email) {
            return $this->json(["message" => "Vous n'êtes pas autorisé à accéder à cette company"], Response::HTTP_UNAUTHORIZED);
        }

        $employee = $employeesRepository->find($employeeId);
        $manager->remove($employee);
        $manager->flush();

        return $this->json([], Response::HTTP_NO_CONTENT);
    }

    #[Route('/employees/{id}/payroll', name: "app_employee_payroll")]
    public function generatePayRoll(PdfGeneratorService $pdfGenerator, Employees $employee, CompanyUser $companyUser)
    {

        $isInCompany = $companyUser->checkEmployee($employee);

        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait pas partie de votre entreprise'], Response::HTTP_UNAUTHORIZED);

        return $pdfGenerator->generatePayrollPdf($employee);
    }

    #[Route('/employees/{id}', name: 'app_employee_retrieve', methods: ["GET"])]
    public function retrieveHours(Employees $employees, CompanyUser $companyUser)
    {
        $isInCompany = $companyUser->checkEmployee($employees);
        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait partie d\'aucune de vos entreprises']);

        return $this->json($employees, Response::HTTP_OK, [], ['groups' => ["item:employee"]]);
    }
}
