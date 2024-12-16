document.addEventListener('DOMContentLoaded', function () {

    let isEditMode = false;
    let edittingId;
    let comment = [];
    const API_URL = 'backend/comment.php';

    async function loadComment() {
        //va al servidor por comentarios
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                comment = await response.json();
                renderTasks(comment);
            } else {
                if (response.status == 401) {
                    window.location.href = 'index.html';
                }
                console.error("Error al obtener comentarios");
            }
        } catch (err) {
            console.error(err);
        }
    }

    function rendercomment(comment) {
        //traer los comentarios desde el backend
        const taskComment = document.getElementById('task-list');
        taskComment.innerHTML = '';
        tasks.forEach(function (task) {

            let commentsList = '';
            if (task.comments && task.comments.length > 0) {
                commentsList = '<ul class="list-group list-group-flush">';
                task.comments.forEach(comment => {
                    commentsList += `<li class="list-group-item">${comment.description} 
                    <button type="button" class="btn btn-sm btn-link remove-comment" data-visitid="${task.id}" data-commentid="${comment.id}">Remove</button>
                    </li>`;
                });
                commentsList += '</ul>';
            }
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${comment.id}</h5>
                    <p class="card-text">${comment.comment}</p></p>
                    ${commentsList}
                     <button type="button" class="btn btn-sm btn-link add-comment"  data-id="${task.id}">Add Comment</button>

                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task"data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </div>
            </div>
            `;
            taskComment.appendChild(taskCard);
        });

        document.querySelectorAll('.editarComentario').forEach(function (button) {
            button.addEventListener('click', handleEditComment);
        });

        document.querySelectorAll('.delete-task').forEach(function (button) {
            button.addEventListener('click', handleDeleteComment);
        });

        document.querySelectorAll('.add-comment').forEach(function (button) {
            button.addEventListener('click', function (e) {
                // alert(e.target.dataset.id);
                document.getElementById("comment-task-id").value = e.target.dataset.id;
                const modal = new bootstrap.Modal(document.getElementById("commentModal"));
                modal.show()

            })
        });
        document.querySelectorAll('.remove-comment').forEach(function (button) {
            button.addEventListener('click', function (e) {
                let taskId = parseInt(e.target.dataset.visitid);
                let commentId = parseInt(e.target.dataset.commentid);
                selectedTask = tasks.find(t => t.id === taskId);
                commentIndex = selectedTask.comments.findIndex(c => c.id === commentId);
                selectedTask.comments.splice(commentIndex, 1);
                loadTasks();
            })
        });
    }

    function handleEditComment(event) {
        try {
            //localizar el comentario
            const taskId = parseInt(event.target.dataset.id);
            const task = comment.find(t => t.id === taskId);
            //cargar los datos en el formulario 
            document.getElementById('task-tit').value = task.title;
            document.getElementById('task-desc').value = task.description;
            //ponerlo en modo edicion
            isEditMode = true;
            edittingId = taskId;
            //mostrar el modal
            const modal = new bootstrap.Modal(document.getElementById("taskModal"));
            modal.show();


        } catch (error) {
            alert("Error trying to edit a task");
            console.error(error);
        }
    }


    async function handleDeleteComment(event) {
        const id = parseInt(event.target.dataset.id);
        const response = await fetch(`${API_URL}?id=${id}`,{
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {
            loadTasks();
        } else {
            console.error("Error eliminando comentarios");
        }
    }

    document.getElementById('comment-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const comment = document.getElementById('task-comment').value;
        const selectedTask = parseInt(document.getElementById('comment-task-id').value);
        const task = comment.find(t => t.id === selectedTask);


        let nextCommentId = 1;

        if (task.comment) {
            nextCommentId = task.comments.length + 1;
        } else {
            task.comments = [];
        }

        comment.comments.push({ id: nextCommentId, description: comment });
        const modal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
        modal.hide();
        loadTasks();

    })

    document.getElementById('task-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const id = document.getElementById("task-id").value;
        const comment = document.getElementById("task-comment").value;

        if (isEditMode) {
            //editar
            const response = await fetch(`${API_URL}?id=${edittingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, comment: comment }),
                credentials: "include"
            });
            if (!response.ok) {
                console.error("Sucedio un error");
            }

        } else {
            const newTask = {
                id: id,
                comment: comment,
            };
            //enviar la tarea al backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask),
                credentials: "include"
            });
            if (!response.ok) {
                console.error("Sucedio un error");
            }
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        loadTasks();
    });

    document.getElementById('commentModal').addEventListener('show.bs.modal', function () {
        document.getElementById('comment-form').reset();
    })

    document.getElementById('taskModal').addEventListener('show.bs.modal', function () {
        if (!isEditMode) {
            document.getElementById('task-form').reset();
            // document.getElementById('task-title').value = "";
            // document.getElementById('task-desc').value = "";
            // document.getElementById('due-date').value = "";
        }
    });

    document.getElementById("taskModal").addEventListener('hidden.bs.modal', function () {
        edittingId = null;
        isEditMode = false;
    })
    loadTasks();

});