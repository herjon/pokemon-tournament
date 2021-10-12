<?php

namespace App\Repository;

use App\Entity\Team;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Team|null find($id, $lockMode = null, $lockVersion = null)
 * @method Team|null findOneBy(array $criteria, array $orderBy = null)
 * @method Team[]    findAll()
 * @method Team[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TeamRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Team::class);
    }

    /**
     * Return json data ordered by last team added
     * @return int|mixed|string
     */
    public function findAllInJson() {
        return $this->createQueryBuilder('t')
            ->select('t')
            ->orderBy('t.created_at', 'DESC')
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * Return team data in json
     * @param $id
     * @return int|mixed|string
     */
    public function getTeamById($id) {
        return $this->createQueryBuilder('t')
            ->select('t')
            ->where('t.id = :id')
            ->setParameter('id', $id )
            ->getQuery()
            ->getArrayResult();
    }

}
