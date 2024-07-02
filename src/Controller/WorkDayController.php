<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\Employees;
use App\Entity\WorkDay;
use App\Repository\WorkDayRepository;
use App\Service\CompanyUser;
use App\Service\EmployeeService;
use App\Service\UserService;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class WorkDayController extends AbstractController
{

    #[Route('/employees/{id}/hours', name: 'app_employee_hours_one', methods: ["GET"])]
    public function retrieveHours(Employees $employees, CompanyUser $companyUser, WorkDayRepository $workDayRepository)
    {
        $isInCompany = $companyUser->checkEmployee($employees);
        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait partie d\'aucune de vos entreprises']);

        $hours = $employees->getWorkDays();

        $isInCompany = $companyUser->checkEmployee($employees);
        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait partie d\'aucune de vos entreprises']);

        $today = new \DateTimeImmutable();
        $hours = $workDayRepository->findByEmployeeAndDate($employees, $today);

        $totalHours = 0;
        foreach ($hours as $workDay) {
            $totalHours += $workDay->getHours();
        }

        $hoursInMonth = $workDayRepository->findByMonth($employees, $today);

        $totalHoursInMonth = 0;

        foreach ($hoursInMonth as $hour) {
            $totalHoursInMonth += $hour->getHours();
        }


        return $this->json(['employee' => $employees, 'hoursToday' => $totalHours, 'hoursMonth' => $totalHoursInMonth], Response::HTTP_OK, [], ['groups' => ["item:employee"]]);
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

    #[Route('/employees/{id}/hours/today', name: 'app_employees_hours_today')]
    public function retrievesHoursToday(Employees $employees, CompanyUser $companyUser, WorkDayRepository $workDayRepository)
    {
        $isInCompany = $companyUser->checkEmployee($employees);
        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait partie d\'aucune de vos entreprises']);

        $today = new \DateTimeImmutable();
        $hours = $workDayRepository->findByEmployeeAndDate($employees, $today);

        $totalHours = 0;
        foreach ($hours as $workDay) {
            $totalHours += $workDay->getHours();
        }

        return $this->json(['employee' => $employees, 'hoursToday' => $totalHours], Response::HTTP_OK, [], ["groups" => "item:employee"]);
    }

    #[Route('/employees/{id}/hours/{month}/{year}', name: 'app_employee_hours')]
    public function getHoursInMonth(Employees $employee, EmployeeService $employeeService, int $month, int $year)
    {
        $hours = $employeeService->getHoursInMonth($employee, $month, $year);
        return $this->json(['employee' => $employee, 'hours' => $hours], Response::HTTP_OK, [], ['groups' => 'item:employee']);
    }

    #[Route('/employees/{id}/hours', name: 'app_employees_hours_create', methods: ['POST'])]
    public function createWorkDay(Request $request, EntityManagerInterface $manager, UserService $userService, Employees $employee, CompanyUser $companyUser)
    {
        $isInCompany = $companyUser->checkEmployee($employee);
        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait partie d\'aucune de vos entreprises']);

        $today = new DateTimeImmutable();

        $hours = $request->getPayload()->get('hours');

        if (!$hours) return $this->json(['message' => 'Vous devez entrer des heures pour ce jour'], Response::HTTP_CONFLICT);

        $workDay = new WorkDay();

        $workDay->setEmployee($employee);
        $workDay->setDate($today);
        $workDay->setHours($hours);

        $manager->persist($workDay);
        $manager->flush();

        return $this->json(['employee' => $employee, 'workDay' => $workDay], Response::HTTP_CREATED, [], ["groups" => ["item:employee"]]);
    }
}
