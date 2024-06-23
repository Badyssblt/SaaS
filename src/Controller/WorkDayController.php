<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\Employees;
use App\Service\CompanyUser;
use App\Service\EmployeeService;
use App\Service\UserService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class WorkDayController extends AbstractController
{

    #[Route('/employees/{id}/hours', name: 'app_employee_hours')]
    public function retrieveHours(Employees $employees, CompanyUser $companyUser)
    {
        $isInCompany = $companyUser->checkEmployee($employees);
        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait partie d\'aucune de vos entreprises']);

        $hours = $employees->getWorkDays();
        return $this->json($hours, Response::HTTP_OK, [], ['groups' => ["item:employee"]]);
    }

    #[Route('/companies/{id}/employees/hours', name: 'app_employees_hours')]
    public function retrievesHours(UserService $userService, Company $company)
    {
        $user = $userService->getUser();

        $employees = $company->getEmployees();

        $hours = [];


        foreach ($employees as $employee) {
            $employeeHours = $employee->getWorkDays();
            $hours[] = [
                'employeeId' => $employee->getId(),
                'employeeName' => $employee->getFirstName(),
                'hours' => $employeeHours
            ];
        }

        return $this->json($hours, Response::HTTP_OK, [], ['groups' => ["item:employee"]]);
    }

    #[Route('/employees/{id}/hours/{month}/{year}', name: 'app_employee_hours')]
    public function getHoursInMonth(Employees $employee, EmployeeService $employeeService, int $month, int $year)
    {
        $hours = $employeeService->getHoursInMonth($employee, $month, $year);
        return $this->json(['employee' => $employee, 'hours' => $hours], Response::HTTP_OK, [], ['groups' => 'item:employee']);
    }
}
