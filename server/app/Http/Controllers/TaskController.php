<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Validator;

class TaskController extends Controller
{
    /**
     * Get authenticated user.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function _construct(){
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = $this->getUser();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Fetch tasks belonging to the authenticated user
        $tasks = Task::where('user_id', $user->id)->get();

        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
{
    try {
        $user = auth()->user();

        // Check if the user is authenticated
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Validate the request data
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'priority' => 'required|integer|between:1,5',
            'due_date' => 'required|date',
        ]);

        // Create the task
        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->priority = $request->priority;
        $task->due_date = $request->due_date;
        $task->userID = $user->id; // Assign the user ID

        // Save the task
        $task->save();

        // Return success response
        return response()->json(['message' => 'Task created successfully', 'task' => $task], 201);
    } catch (\Exception $e) {
        // Handle any exceptions
        return response()->json(['error' => 'Failed to create task', 'message' => $e->getMessage()], 500);
    }
}


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $this->getUser();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Validation and storing logic
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = $this->getUser();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Fetch the task with the specified ID
        $task = Task::where('user_id', $user->id)->find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = $this->getUser();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Logic for showing the edit form
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
{
    try {
        $user = auth()->user();

        // Check if the user is authenticated
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Find the task by ID
        $task = Task::find($id);

        // Check if the task exists
        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        // Update the task fields if provided in the request
        if ($request->has('title')) {
            $task->title = $request->title;
        }

        if ($request->has('description')) {
            $task->description = $request->description;
        }

        if ($request->has('priority')) {
            $task->priority = $request->priority;
        }

        if ($request->has('due_date')) {
            $task->due_date = $request->due_date;
        }

        // Save the updated task
        $task->update();

        // Return success response
        return response()->json(['message' => 'Task updated successfully', 'task' => $task], 200);
    } catch (\Exception $e) {
        // Handle any exceptions
        return response()->json(['error' => 'Failed to update task', 'message' => $e->getMessage()], 500);
    }
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = $this->getUser();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Deleting logic
    }
}
