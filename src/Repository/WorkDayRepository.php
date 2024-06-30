<?php

namespace App\Repository;

use DateTimeImmutable;
use App\Entity\WorkDay;
use App\Entity\Employees;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<WorkDay>
 */
class WorkDayRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WorkDay::class);
    }

    public function findByEmployeeAndDate(Employees $employee, DateTimeImmutable $date): array
    {
        $dateString = $date->format('Y-m-d');

        $qb = $this->createQueryBuilder('w')
            ->where('w.employee = :employee')
            ->andWhere('w.date LIKE :date')
            ->setParameter('employee', $employee)
            ->setParameter('date', $dateString . '%');

        return $qb->getQuery()->getResult();
    }

    public function findByMonth(Employees $employee, DateTimeImmutable $date): array
    {
        $startOfMonth = $date->modify('first day of this month')->setTime(0, 0);
        $endOfMonth = $date->modify('last day of this month')->setTime(23, 59, 59);

        $qb = $this->createQueryBuilder('w')
            ->where('w.employee = :employee')
            ->andWhere('w.date BETWEEN :start AND :end')
            ->setParameter('employee', $employee)
            ->setParameter('start', $startOfMonth)
            ->setParameter('end', $endOfMonth);

        return $qb->getQuery()->getResult();
    }

    //    /**
    //     * @return WorkDay[] Returns an array of WorkDay objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('w')
    //            ->andWhere('w.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('w.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?WorkDay
    //    {
    //        return $this->createQueryBuilder('w')
    //            ->andWhere('w.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
