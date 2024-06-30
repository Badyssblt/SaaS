<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Employees;
use App\Repository\EmployeesRepository;
use App\Repository\UserRepository;
use App\Repository\WorkDayRepository;
use DateTimeImmutable;

class EmployeeService
{
    private UserRepository $userRepository;
    private TokenValidator $tokenValidator;
    private WorkDayRepository $workDayRepository;

    public function __construct(UserRepository $userRepository, TokenValidator $tokenValidator, workDayRepository $workDayRepository)
    {
        $this->userRepository = $userRepository;
        $this->tokenValidator = $tokenValidator;
        $this->workDayRepository = $workDayRepository;
    }

    /**
     * Retourne les heures d'un employé au mois
     * @param int $year Must be full exemple: 2024
     * @return User
     * @throws Exception 
     */
    public function getHoursInMonth(Employees $employee, int $month, int $year): int
    {
        $hours = 0;
        foreach ($employee->getWorkDays() as $workDay) {
            if ($workDay->getDate()->format('Y') == $year && $workDay->getDate()->format('m') == $month) {
                $hours += $workDay->getHours();
            }
        }
        return $hours;
    }
}
