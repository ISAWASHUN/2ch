<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResponseResource;
use App\Models\Response;
use App\Models\Thread;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(int $threadId, Request $request)
    {
        $thread = Thread::findOrFail($threadId);
        $responseNo = $thread->responses()->max('response_no') + 1;

        $response = $thread
            ->responses()
            ->create(['response_no' => $responseNo] + $request->only(['name', 'email', 'content']));

        return new ResponseResource($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(Response $response)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Response $response)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Response $response)
    {
        //
    }
}
