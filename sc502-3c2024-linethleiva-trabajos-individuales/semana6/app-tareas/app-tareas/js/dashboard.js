document.addEventListener('DOMContentLoaded', function () {

    let isEditMode = false;
    let edittingId;
    const tasks = [{
        id: 1,
        title: "Complete project report",
        description: "Prepare and submit the project report",
        dueDate: "2024-12-01",
        comm: [],
    },
    {
        id: 2,
        title: "Team Meeting",
        description: "Get ready for the season",
        dueDate: "2024-12-01",
        comm: [],
    },
    {
        id: 3,
        title: "Code Review",
        description: "Check partners code",
        dueDate: "2024-12-01",
        comm: [],
    },
    {
        id: 3,
        title: "Deploy",
        description: "Check deploy code",
        dueDate: "2024-12-01",
        comm: [],
    }
    ];

    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">

            <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>

                <div class="comments-section">
                    <h6>Add Comments</h6>
                        <ul id="comments-${task.id}" class="list-group mb-3">
                            ${task.comments.map(comm =>
                               `<li class="list-group-item d-flex justify-content-between align-items-center">
                                    ${comm}
                                    <button class="btn btn-danger btn-sm delete-comm" data-task-id="${task.id}"data-comment="${comm}">Delete</button>
                                </li>`
                        ).join('')}
                        </ul>  

                    <div class="input-group mb-3">
                        <input type="text" class="form-control comm-input" placeholder="Add a text" data-task-id="${task.id}">
                        <button class="btn btn-warning btn-sm add-comm" data-task-id="${task.id}">Save</button>
                    </div>
                </div>
            </div>

                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </div>

            </div>
            `;
            taskList.appendChild(taskCard);
        });

        document.querySelectorAll('.edit-task').forEach(function (button) {
            button.addEventListener('click', handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function (button) {
            button.addEventListener('click', handleDeleteTask);
        });

        document.querySelectorAll('.add-comm').forEach(function (button) {
            button.addEventListener('click', handleSaveTask);
        });

        document.querySelectorAll('.delete-comm').forEach(function (button) {
            button.addEventListener('click', handleDeleteComm);
        });

    }

    function handleEditTask(event) {
        try {
            //abrir el modal y mostrar los datos
            //alert(event.target.dataset.id);
            const taskId = parseInt(event.target.dataset.id);
            const task = tasks.find(t => t.id === taskId); //localizando tarea
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.description;
            document.getElementById('task-date').value = task.dueDate;
            isEditMode = true;
            edittingId = taskId;
            const modal = new bootstrap.Modal(document.getElementById("taskModal"));
            modal.show();

        } catch (error) {
            alert("Error trying to edit a task");
            console.error(error);
        }
    }


    function handleDeleteTask(event) {
        const id = parseInt(event.target.dataset.id);
        const index = tasks.findIndex(t => t.id === id);
        tasks.splice(index, 1);
        loadTasks();
    }


    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;
        const dueDate = document.getElementById("due-date").value;

        if (isEditMode) {
            const task = tasks.find(T => T.id === edittingId);
            task.title = title;
            task.description - description;
            task.dueDate = dueDate;
        } else {
            const newTask = {
                id: tasks.length + 1,
                title: title,
                description: description,
                dueDate: dueDate,
                comm: []
            };
            tasks.push(newTask);
        }
        const modal = bootstrap.modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        loadTasks;
    });

    document.getElementById('taskModal').addEventListener('show.bs.modal', function () {
        if (!isEditMode) {
            document.getElementById('task-form').reset();
        }
    });

    document.getElementById("taskModal").addEventListener('hidden.bs.modal', function () {
        edittingId = null;
        isEditMode = false;
    })

    function handleSaveTask(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const input = document.querySelector(`.comm-input[data-task-id="${taskId}"]`);

        const comm = input.value.trim();

        if (comm) {
            const task = tasks.find(t => t.id === taskId);
            task.comm.push(comm);
            input.value = '';
            loadTasks();
        }
    }

    function handleDeleteComm(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const commText = event.target.dataset.comm;

        const task = tasks.find(t => t.id === taskId);
        task.comments = task.comments.filter(comm => comm !== commText);
        loadTasks();
    }

    loadTasks();

});