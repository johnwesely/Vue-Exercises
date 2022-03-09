<div>
    @foreach($projects as $project)
        <span>
            <div>Project Title: {{ $project->name }}</div>
            <div>Project Description: {{ $project-description }}</div>
        </span>
    @endforeach
</div>