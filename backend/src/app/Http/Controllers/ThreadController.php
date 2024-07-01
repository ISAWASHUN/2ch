<?php

namespace App\Http\Controllers;

use App\Http\Resources\ThreadResource;
use App\Http\Resources\ThreadWithResponseResource;
use App\Models\Thread;
use Illuminate\Http\Request;

class ThreadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $threads = Thread::with([
            'responses' => function ($query) {
                $query->latest()->limit(10);
            },
        ])
            ->withCount('responses')
            ->get();

        return ThreadWithResponseResource::collection($threads);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $thread = Thread::create($request->only(
            ['title', 'name', 'email', 'content']
        ));

        return new ThreadResource($thread);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $thread = Thread::with('responses')->withCount('responses')->findOrFail($id);

        return new ThreadWithResponseResource($thread);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Thread $thread)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thread $thread)
    {
        //
    }
}
