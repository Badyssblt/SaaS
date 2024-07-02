<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\EmployeesRepository;
use DateTimeImmutable;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: EmployeesRepository::class)]
class Employees
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["item:company", "item:employee", 'item:leave'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["item:company", "item:employee", 'item:leave'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["item:company", "item:employee", 'item:leave'])]
    private ?string $lastName = null;

    #[ORM\Column]
    #[Groups(["item:employee"])]
    private ?\DateTimeImmutable $birth_at = null;

    #[ORM\Column(length: 255)]
    #[Groups(["item:employee", 'item:leave', "item:company"])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(["item:employee", "item:company"])]
    private ?int $phone_number = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["item:employee"])]
    private ?string $address = null;

    #[ORM\Column]
    #[Groups(["item:employee", 'item:leave'])]
    private ?\DateTimeImmutable $hired_at = null;

    #[ORM\Column(length: 255)]
    #[Groups(["item:employee", 'item:leave', "item:company"])]
    private ?string $job_title = null;

    #[ORM\Column]
    #[Groups(["item:employee", 'item:leave', "item:company"])]
    private ?float $salary = null;

    #[ORM\Column(length: 255)]
    #[Groups(["item:employee", 'item:leave', "item:company"])]
    private ?string $status = null;

    #[ORM\Column]
    #[Groups(["item:employee"])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column]
    #[Groups(["item:employee"])]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $company = null;

    /**
     * @var Collection<int, WorkDay>
     */
    #[ORM\OneToMany(targetEntity: WorkDay::class, mappedBy: 'employee', orphanRemoval: true)]
    #[Groups(["item:employee", "item:company"])]
    private Collection $workDays;

    /**
     * @var Collection<int, Leave>
     */
    #[ORM\OneToMany(targetEntity: Leave::class, mappedBy: 'employee', cascade: ["REMOVE"])]
    #[Groups(["item:leave"])]
    private Collection $leaves;

    public function __construct()
    {
        $this->created_at = new DateTimeImmutable();
        $this->updated_at = new DateTimeImmutable();
        $this->workDays = new ArrayCollection();
        $this->leaves = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getBirthAt(): ?\DateTimeImmutable
    {
        return $this->birth_at;
    }

    public function setBirthAt(\DateTimeImmutable $birth_at): static
    {
        $this->birth_at = $birth_at;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhoneNumber(): ?int
    {
        return $this->phone_number;
    }

    public function setPhoneNumber(int $phone_number): static
    {
        $this->phone_number = $phone_number;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getHiredAt(): ?\DateTimeImmutable
    {
        return $this->hired_at;
    }

    public function setHiredAt(\DateTimeImmutable $hired_at): static
    {
        $this->hired_at = $hired_at;

        return $this;
    }

    public function getJobTitle(): ?string
    {
        return $this->job_title;
    }

    public function setJobTitle(string $job_title): static
    {
        $this->job_title = $job_title;

        return $this;
    }

    public function getSalary(): ?float
    {
        return $this->salary;
    }

    public function setSalary(float $salary): static
    {
        $this->salary = $salary;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, WorkDay>
     */
    public function getWorkDays(): Collection
    {
        return $this->workDays;
    }

    public function addWorkDay(WorkDay $workDay): static
    {
        if (!$this->workDays->contains($workDay)) {
            $this->workDays->add($workDay);
            $workDay->setEmployee($this);
        }

        return $this;
    }

    public function removeWorkDay(WorkDay $workDay): static
    {
        if ($this->workDays->removeElement($workDay)) {
            // set the owning side to null (unless already changed)
            if ($workDay->getEmployee() === $this) {
                $workDay->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Leave>
     */
    public function getLeaves(): Collection
    {
        return $this->leaves;
    }

    public function addLeaf(Leave $leaf): static
    {
        if (!$this->leaves->contains($leaf)) {
            $this->leaves->add($leaf);
            $leaf->setEmployee($this);
        }

        return $this;
    }

    public function removeLeaf(Leave $leaf): static
    {
        if ($this->leaves->removeElement($leaf)) {
            // set the owning side to null (unless already changed)
            if ($leaf->getEmployee() === $this) {
                $leaf->setEmployee(null);
            }
        }

        return $this;
    }
}
