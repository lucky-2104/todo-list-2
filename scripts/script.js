const taskInput = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters span");
const taskBox = document.querySelector(".task-box");
let todos = JSON.parse(localStorage.getItem("todo-list"));

let editId;
let isedited = false;


filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter)
{
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += `<li class="task">
                    <label for="${id}">
                        <input onclick = "updateStatus(this)" type="checkbox" id ="${id}" ${isCompleted} >
                        <p class = "${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="setting">
                        <i onClick = "showMenu(this)" class="fa fa-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick = "updateTask(${id} , '${todo.name}')"><i class = "fa fa-edit"></i>Edit</li>
                            <li onclick = "deleteTask(${id})"><i class = "fa fa-trash-o"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
            }
                
            });
    }
    
    taskBox.innerHTML = li || `<span> You don't have any task here </span>` ;
}
showTodo("all");

function showMenu(selectedTask) {
    
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click",e => {
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    })
}

function updateTask(updateId, task) {
    editId = updateId;
    isedited = true;
    taskInput.value = task;

    
}

function deleteTask(deleteId)
{
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}
function updateStatus(selectedTask) {
    //getting paragraph that contain task name.
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked)
    {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }
    else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));

}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isedited) {
            if (!todos)
            {
                todos = [];
            }
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            isedited = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all"); 
    }
    
});