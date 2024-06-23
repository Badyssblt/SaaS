<?php

namespace App\Command;

use App\Entity\Leave;
use App\Entity\LeaveType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:check-leave',
    description: 'Vérifie tous les jours les congés',
)]
class CheckLeaveCommand extends Command
{

    private $entityManager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->entityManager = $manager;
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $repository = $this->entityManager->getRepository(Leave::class);

        $leaves = $repository->createQueryBuilder('l')
            ->where('l.end_at <= :today')
            ->setParameter('today', new \DateTimeImmutable())
            ->getQuery()
            ->getResult();

        foreach ($leaves as $leave) {
            $employee = $leave->getEmployee();
            $employee->setStatus("Active");

            $this->entityManager->persist($employee);
        }

        $this->entityManager->flush();

        $output->writeln('Les statuts des congés ont été mis à jour avec succès.');

        return Command::SUCCESS;
    }
}
