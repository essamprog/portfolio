document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const input = document.getElementById("task-input");
    const task = input.value.trim();

    if (task) {
        createTaskElement(task);
        saveTask(task, false);
        input.value = "";
    } else {
        swal("Important alert!!!", "you must write something!");
    }

}

function createTaskElement(taskText, isDone = false) {
    const li = document.createElement("li");
    li.textContent = taskText;

    if (isDone) li.classList.add("checked");

    li.addEventListener("click", function () {
        li.classList.toggle("checked");
        updateTaskStatus(taskText, li.classList.contains("checked"));
    });

    const span = document.createElement("span");
    span.textContent = "×";
    span.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        removeTask(taskText);
    });

    li.appendChild(span);
    document.getElementById("task-list").appendChild(li);
}

function saveTask(task, isDone) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, done: isDone });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTaskElement(t.text, t.done));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(taskText, isDone) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(t =>
        t.text === taskText ? { ...t, done: isDone } : t
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
