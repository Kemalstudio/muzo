<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;

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
        $this->authorize('update', $this->service->get($id));
        $user = $this->service->update($id, $request->only(['name', 'email']));
        return new UserResource($user);
    }

    public function destroy(int $id)
    {
        $this->authorize('delete', $this->service->get($id));
        $this->service->delete($id);
        return $this->apiResponse(null, 'Deleted', 204);
    }
}
