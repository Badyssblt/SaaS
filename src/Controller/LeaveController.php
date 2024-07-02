<?php

namespace App\Controller;

use App\Entity\Employees;
use App\Entity\Leave;
use App\Repository\LeaveRepository;
use App\Service\CompanyUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

class LeaveController extends AbstractController
{
    #[Route('/employees/{id}/leaves', name: 'app_employee_leaves', methods: ["GET"])]
    public function retrieveLeave(Employees $employees, CompanyUser $companyUser)
    {
        $isInCompany = $companyUser->checkEmployee($employees);

        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait pas partie de votre entreprise'], Response::HTTP_UNAUTHORIZED);

        return $this->json($employees, Response::HTTP_OK, [], ['groups' => ['item:leave']]);
    }


    #[Route('/employees/{id}/leaves', name: "app_employee_leaves_create", methods: ["POST"])]
    public function createLeave(Request $request, SerializerInterface $serializer, EntityManagerInterface $manager, Employees $employees, CompanyUser $companyUser)
    {
        $isInCompany = $companyUser->checkEmployee($employees);

        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait pas partie de votre entreprise'], Response::HTTP_UNAUTHORIZED);

        $data = $request->getContent();
        $leave = $serializer->deserialize($data, Leave::class, 'json');
        $leave->setEmployee($employees);

        $employees->setStatus("Leave");

        $manager->persist($leave);
        $manager->persist($employees);

        $manager->flush();

        return $this->json($employees, Response::HTTP_OK, [], ['groups' => ['item:leave']]);
    }

    #[Route('/employees/{id}/leaves/{leaveId}', name: "app_employee_leaves_edit", methods: ["PATCH"])]
    public function editLeave(Request $request, SerializerInterface $serializer, EntityManagerInterface $manager, Employees $employees, CompanyUser $companyUser, LeaveRepository $leaveRepository, int $leaveId)
    {
        $isInCompany = $companyUser->checkEmployee($employees);

        if (!$isInCompany) return $this->json(['message' => 'Cet employé ne fait pas partie de votre entreprise'], Response::HTTP_UNAUTHORIZED);
        $leave = $leaveRepository->find($leaveId);
        $data = $request->getContent();
        $leaveTarget = $serializer->deserialize($data, Leave::class, 'json');

        if ($leaveTarget->getStartedAt()) {
            $leave->setStartedAt($leaveTarget->getStartedAt());
        }

        if ($leaveTarget->getEndAt()) {
            $leave->setEndAt($leaveTarget->getEndAt());
        }

        if ($leaveTarget->getType()) {
            $leave->setType($leaveTarget->getType());
        }

        $manager->persist($leave);
        $manager->flush();

        return $this->json($employees, Response::HTTP_OK, [], ['groups' => ['item:leave']]);
    }
}
