<?php

namespace App\Entity;

use App\Enum\LeaveType;
use App\Enum\LeaveTypes;
use App\Entity\LeaveStatus;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\LeaveRepository;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: LeaveRepository::class)]
#[ORM\Table(name: '`leave`')]
class Leave
{


    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["item:leave"])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'leaves')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Employees $employee = null;

    #[ORM\Column]
    #[Groups(["item:leave"])]
    private ?\DateTimeImmutable $started_at = null;

    #[ORM\Column]
    #[Groups(["item:leave"])]
    private ?\DateTimeImmutable $end_at = null;

    #[ORM\Column(length: 255)]
    #[Groups(["item:leave"])]
    private ?string $type = null;


    public function getId(): ?int
    {
        return $this->id;
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

    public function getStartedAt(): ?\DateTimeImmutable
    {
        return $this->started_at;
    }

    public function setStartedAt(\DateTimeImmutable $started_at): static
    {
        $this->started_at = $started_at;

        return $this;
    }

    public function getEndAt(): ?\DateTimeImmutable
    {
        return $this->end_at;
    }

    public function setEndAt(\DateTimeImmutable $end_at): static
    {
        $this->end_at = $end_at;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        if (!in_array($type, [
            LeaveTypes::TYPE_ANNUAL,
            LeaveTypes::TYPE_SICK,
            LeaveTypes::TYPE_MATERNITY,
            LeaveTypes::TYPE_UNPAID,
        ])) {
            throw new \InvalidArgumentException("Type de congé invalide");
        }
        $this->type = $type;

        return $this;
    }
}
