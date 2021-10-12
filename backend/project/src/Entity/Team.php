<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TeamRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Team
{
    const TEAM_NAME_KEY_REQUEST = 'teamName';
    const POKEMONS_KEY_REQUEST = 'pokemons';
    const CACHE_KEY = 'teamList';
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created_at;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $pokemons_data = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(?\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getPokemonsData(): ?array
    {
        return $this->pokemons_data;
    }

    public function setPokemonsData(?array $pokemons_data): self
    {
        $this->pokemons_data = $pokemons_data;

        return $this;
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue(): void
    {
        $this->created_at = new \DateTime();
    }
}
