
import { TaskController} from "./controllers/task-controller.js";
import { Task } from "./models/type.js";


const taskListElement = document.getElementById("task-list") as HTMLElement;
const taskForm = document.getElementById("task-form") as HTMLFormElement;

const taskController = new TaskController("1");

taskForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    console.log("Form submitted");

    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
    const dueDate = (document.getElementById("due-date") as HTMLInputElement).value;

    console.log(title, description, dueDate);

    const newTask: Task = {
        id: "", 
        title,
        description,
        dueDate: new Date(dueDate), 
        completed: false,
        userId: "1"
    };

    taskController.createTask(newTask);
});

function taskListItem(task: Task) {
    const taskListItemElement = document.createElement("li");
    taskListItemElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due date: ${task.dueDate?.toLocaleDateString() || "No due date"}</p>
        <button>Edit</button>
        <button>Delete</button>
        <button>Mark as Complete</button>
        `;
    return taskListItemElement;
}

function renderTasks() {
    taskListElement.innerHTML = "";
    const tasks = taskController.getAllTasks();
    console.log(tasks);
    tasks.forEach(task => {
        taskListElement.appendChild(taskListItem(task));
    });
}

renderTasks();


