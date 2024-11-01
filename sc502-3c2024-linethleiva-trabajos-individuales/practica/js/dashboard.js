document.addEventListener('DOMContentLoaded', function () {
    const task = [{
        id: 1,
        title: "Complete projet report",
        description: "Prepare and submit the project report",
        dueDate: "2024-12-01"
    },
    {
        id: 2,
        title: "Team Meeting",
        description: "Get ready for the season",
        dueDate: "2024-12-01"
    },
    {
        id: 3,
        title: "Code review",
        description: "Check partners code",
        dueDate: "2024-12-01"
    }];

    function loadTask() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        task.forEach(function (task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class ="card-body">
                   <h5 class ="card-title">${task.title}</h5>
                   <p class="card-text">${task.description}</p>
                   <p class ="card-text"><small class="text-muted">Due:${task.dueDate}</small></p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                  <button class=" btn btn-secondary bt-sm edit-task" data-id="${task.id}">Edit</button>
                  <button class=" btn btn-danger bt-sm delete-task" data-id="${task.id}">Delete</button>
                </div>
            </div>
            `;
            taskList.appendChild(taskCard);
        });

        document.querySelectorAll('.edit-task').forEach(function(button){
            button.addEventListener('click',handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function(button){
            button.addEventListener('click',handleDeleteTask);
        });
    }

    function handleEditTask(event){
        alert(event.target.dataset.id);
    }

    function handleDeleteTask(event){
        alert(event.target.dataset.id);
    }
 
    document.getElementById('task-from').addEventListener('submit', function(e){
       e.preventDefault();
       alert("crear tarea");
    });

    loadTask();
});