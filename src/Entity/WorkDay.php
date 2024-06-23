<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\WorkDayRepository;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: WorkDayRepository::class)]
class WorkDay
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["item:employee"])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(["item:employee"])]
    private ?\DateTimeImmutable $date = null;

    #[ORM\Column]
    #[Groups(["item:employee"])]
    private ?int $hours = null;

    #[ORM\ManyToOne(inversedBy: 'workDays')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Employees $employee = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeImmutable
    {
        return $this->date;
    }

    public function setDate(\DateTimeImmutable $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getHours(): ?int
    {
        return $this->hours;
    }

    public function setHours(int $hours): static
    {
        $this->hours = $hours;

        return $this;
    }

    public function getEmployee(): ?Employees
    {
        return $this->employee;
    }

    public function setEmployee(?Employees $employee): static
    {
        $this->employee = $employee;

        return $this;
    }
}
