//  Grab the input where we want to do something
const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks=[];

addTaskButton.addEventListener('click',() => {
    // trim cut extra spaces at the end
   const taskText= todoInput.value.trim();
   if(taskText === ""){
    return;
   }
   const newTask={
    id:Date.now(),
    text:taskText,
    completed:false

   }
   tasks.push(newTask)
   todoInput.value="";// clear input

   console.log(tasks);
   


});