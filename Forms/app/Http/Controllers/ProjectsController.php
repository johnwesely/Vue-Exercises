<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectsController extends Controller
{
    public function create()
    {
        return view('projects.create', [
            'projects' => Project::all()
        ]);
    }
}
