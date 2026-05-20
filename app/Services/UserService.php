<?php

namespace App\Services;

use App\Repositories\UserRepositoryInterface;

class UserService
{
    public function __construct(protected UserRepositoryInterface $users)
    {
    }

    public function list(array $filters = [])
    {
        return $this->users->all($filters);
    }

    public function get(int $id)
    {
        return $this->users->find($id);
    }

    public function create(array $data)
    {
        return $this->users->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->users->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->users->delete($id);
    }
}
