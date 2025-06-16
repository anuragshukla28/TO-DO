 //  Grab the input where we want to do something

document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(element => {
        renderTask(element);
    });

    addTaskButton.addEventListener('click', addTask);

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
          // trim cut extra spaces at the end
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        // Prevent duplicate tasks
        if (tasks.some(t => t.text === taskText)) {
            alert("Task already exists!");
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
    }

    function renderTask(task) {
        if (!task.text.trim()) return;

        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `<span>${task.text}</span>
                        <button>Delete</button>`;

        // Toggle completion
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        });

        // Delete task
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks(); // Save updated list
            li.remove();
        });

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
