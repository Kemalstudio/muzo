<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct(protected UserService $service)
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $users = $this->service->list($request->all());
        return UserResource::collection($users);
    }

    public function show(int $id)
    {
        $user = $this->service->get($id);
        $this->authorize('view', $user);
        return new UserResource($user);
    }

    public function update(Request $request, int $id)
    {
        $user = $this->service->get($id);
        $this->authorize('update', $user);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($id)],
            'username' => ['nullable', 'string', 'max:255', Rule::unique('users')->ignore($id)],
            'avatar' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('avatar')) {
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }

            $validated['avatar_path'] = $request->file('avatar')->store("avatars/{$id}", 'public');
        }

        $updatedUser = $this->service->update($id, Arr::except($validated, ['avatar']));
        return new UserResource($updatedUser);
    }

    public function destroy(int $id)
    {
        $this->authorize('delete', $this->service->get($id));
        $this->service->delete($id);
        return $this->apiResponse(null, 'Deleted', 204);
    }
}
