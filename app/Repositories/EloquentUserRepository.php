<?php

namespace App\Repositories;

use App\Models\User;

class EloquentUserRepository implements UserRepositoryInterface
{
    public function all(array $filters = [])
    {
        $query = User::query();

        if (!empty($filters['email'])) {
            $query->where('email', $filters['email']);
        }

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function find(int $id)
    {
        return User::findOrFail($id);
    }

    public function create(array $data)
    {
        return User::create($data);
    }

    public function update(int $id, array $data)
    {
        $user = $this->find($id);
        $user->update($data);
        return $user;
    }

    public function delete(int $id): bool
    {
        $user = $this->find($id);
        return $user->delete();
    }
}
